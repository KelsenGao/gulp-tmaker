var Tagbase = require('./tagbase'),
	Salt	= require('./salt'),
	crypto 	= require('crypto');

module.exports = (function name(params) {
	
	var core = {},
		content = '',
		curFile = {},
		curTmake = {},
		curLine = 0,
		hasWebCount = false;
	core.options = {
		isPreview : false,
		lang:'zh'
	}
	
	core.initTmakerOptions = function (opts){		
		core.options.isPreview = opts && opts.isPreview || false;
		core.options.lang = opts && opts.lang || 'zh';
		Salt.setLang(core.options.lang);
	}
	/**
	 * 获取指定（正则）标签在源代码中的位置
	 * 
	 * @param source 源代码
	 * @param tagPartten 匹配指定标签的正则
	 * 
	 * @returns 给定正则匹配到的标签及其在源码中的起始位置与结束位置
	 */
	function getIndex(source, tagPattern) {
		var rs = source.match(tagPattern);
		if(rs != null){
			return {
				firstIndex : rs.index,
				lastIndex  : rs.index + rs[0].length,
				tag		   : rs[0]
			};
		}else{
			return -1;
		}
	}
	
	/**
	 * 解析 Tmaker 标签属性信息
	 * 
	 * @param TmakerHead
	 * @returns {}
	 */
	function getTmakerHeadAttr(TmakerHead){
		TmakerHead = TmakerHead.slice(10,-3);
		var _index = 0,
			_tag = [],
			_attr = {};
		while (_index >-1) {
			var _tmp = getIndex(TmakerHead,/[a-zA-Z_][\w:\-\.]*\s*=\s*['"](.*?)['"]/);
			TmakerHead = TmakerHead.slice(_tmp.lastIndex);
			if(_tmp.tag == undefined) break;
			_tag = _tmp.tag.split('=');
			_attr[_tag[0].replace(/\s/,'')] = _tag[1].replace(/['"]/g,"");
			_index = _tmp.lastIndex;
		}
		return _attr;
	}
	
	/**
	 * 从模板中取出需要循环显示的部分，如果代码中包含 item 则返回 item 部分，否则返回整个输入的内容。
	 * 
	 * @param tpl 模板源代码
	 * @returns String
	 */
	function getItemFromTpl(tpl) {
		var _item = tpl.match(/<!--\s*item\s*-->([\s\S]*)<!--\s*\/\s*item\s*-->/);
		if(_item != null){
			return _item[1];
		} else {
			return tpl;
		}
	}
	
	// 驼峰与连字符表示方式转换
	var camelCase = {
		toCamelCase : function (str,pascalStyle) {
			str = pascalStyle ? ('-' + str) : str;
			return str.replace(/-([a-zA-Z])/g, function(all, letter){
				return letter.toUpperCase();
        	});
		},
		toString	: function (str) {
			return str.replace(/([A-Z])/g,"-$1").toLowerCase();
		}
	};
	
	// throwError 
	var throwError = function(msg,snippet) {
			snippet = snippet ? "\nCode：" + snippet : "";
			throw new Error(msg + snippet + '\nFile：' + curFile.path + ' in Line: ' + (curLine+1));
		}
	
	// 根据指定的 关系键 合并对象，支持忽略字段
	var extend = function (target, source, relation, ignore) {
		var newobj = {};
		for (var key in target) {
			if (target.hasOwnProperty(key)) {
				newobj[key] = target[key];				
				if( ignore.indexOf(key) < 0){
					(source[key] || source[relation[key]] || false) && (newobj[key] = source[key] || source[relation[key]]);
				}
			}
		}
		newobj._private = source;
		return newobj;
	}
	
	/**
	 * 转换 Tmaker 标签中的语义化值为 翔宇系统能够识别的 真实值
	 */
	function translateAttr(conf){
		
		var FormatField = Tagbase.Format.field;
		var rvalue;
		
		FormatField.forEach(function (element) {
			if (conf[element] && conf[element].length > 0) {
				rvalue = '';

				// 竖线“|”用来匹配多项选择，如稿件类型 filter = "img | headline"
				conf[element].split('|').forEach(function (item) {
					rvalue += Tagbase.Format[element + 'Format'][item] || 'undefined';
				}, this);
				
				// 如果是 site 属性，则允许其语义化值对应的可识别值（站点前缀）为空字符串
				if (element == 'site') {
					conf[element] = rvalue;
				} else {
					conf[element] = rvalue=='undefined' ? conf[element] : rvalue;
				}

			}
		}, this);
		return conf;
	}
	
	/**
	 * 构建翔宇标签头 
	 * @param TmakerHead object of TmakerHeadAttr
	 */
	function enpHeadBuild (TmakerHead) {
		
		var _bot = '',			
			_config = {},
			_merged = {},
			_headstr = '<!--webbot',
			_headend = ' startspan --><!--webbot bot="s%" endspan i-checksum="0" -->';
		
		if(!TmakerHead.hasOwnProperty('bot')){			
			throwError('bot 没有定义',curTmake.headCode);
		}
		
		_bot = TmakerHead.bot = camelCase.toCamelCase(TmakerHead.bot, true);
		
		if(Tagbase[_bot] == undefined){
			throwError('bot 定义无效',curTmake.headCode);
		}
		
		_config = Tagbase[_bot].config;
		_merged = curTmake.head = extend(_config,TmakerHead,Tagbase.Relation,['bot']);

		// 如果是本地预览则跳过头部编译，直接输出 {s%} 置标
		if (core.options.isPreview) {
			_headstr = Tagbase.Preview.NobodyTag[_merged.bot] || '';
			// 如果是 SingleNode
			if (_bot == 'SingleNode' && _merged._private.type.length>0 && Tagbase.Format.szinfoFormat[_merged.szinfo] == undefined) {
				_headstr = _headstr.replace('单个栏目', _merged.szinfo)
			}
			return _headstr + '{s%}';
		}
		
		// 计算 属性值
		if (_merged.id){
			_merged.id = _merged.id + crypto.createHash("md5").update(Date.parse(new Date()).toString()+Math.random()).digest("hex");
		}
		
		_merged = translateAttr(_merged);
		
		switch (_bot) {
			case 'WebCount':
				_headstr = Tagbase.WebCount.field.common + Tagbase.WebCount.field[_merged.page]
				_headstr = _headstr.replace(/\{pre%\}/g,_merged.site);
				hasWebCount = true;
				break;
				
			case 'WechatShare':
				_headstr = Tagbase.WechatShare.field.script;
				_headstr = _headstr.replace(/\{s%\}/,_merged.version);
				break;
		
			default:
				// 生成 enp 标签
				for (var key in _merged) {
					if (_config.hasOwnProperty(key)) {
						_headstr += ' '+ key + '="' + _merged[key]+'"';
					}
				}
				_headstr = _headstr + _headend.replace('s%',_config.bot);
				break;
		}

		return _headstr;
		
	}
	
	function enpLoopBuild(tpl,arr){
		arr.push(tpl);
		var _repeat = Tagbase.Command.loop;
		_repeat = _repeat.replace(/s%/g,function(){
			return arr.shift();
		});
		return _repeat;
	}
	
	// 构建 wrapper (article | class)
	function enpWrapperBuild(tpl) {
		tpl = tpl.replace(/<!--[\s|\/]*(article|class)\s*-->/img,function(all) {
			return all.replace(/[!-]/g,'').replace(/([a-zA-Z])/, function(all, letter){
				return letter.toUpperCase();
        	});
		});
		return tpl;
	}
	
	function getEnpField(key){
		
		/**
		 * 处理参数和预览信息，字段配置格式如下：
		 * field# 预览信息
		 * field| 参数信息
		 */

		var _function = '',
			_field = '',
			_param = '',
			_previewdata = null,
			_temp = '';

		// 处理参数[|]和预览数据[#]
		_field = key.split('|')[0].replace(/\s/,'');
		_param = key.split('|')[1] || null;
		_previewdata = key.split('#')[1] || null;

		if(core.options.isPreview){
			
			if(_previewdata){
				return _previewdata;
			}

			_temp = Tagbase.Preview.CommonField[_field] || Tagbase[curTmake.head._private.bot].field[_field] || 'null';
			_function = _temp.split('|')[0];
			_param = _param ? _param : _temp.split('|')[1];

			if(Salt.hasOwnProperty(_function)){
				return Salt[_function](_param);
			}else{
				return Tagbase.Preview.CommonField[_field] || '{#无效字段}';
			}
			
		}else{
			
			_temp = Tagbase.CommonField[_field] || Tagbase[curTmake.head._private.bot].field[_field] || '{#无效字段}';
			
			// 替换 s% 为正式内容
			if(_temp.search(/s%/) >= 0){
				_temp = _temp.replace('s%', fieldRander(_field, _param));
			}
			return _temp;
		}
	}
	
	/**
	 * 解析模板中的字段配置信息，如果没有取到配置信息则采用默认配置
	 */
	function fieldRander (field, param) {

		if (Tagbase.Format[field] == undefined) {
			return param ? param : 0;
		}

		if (param && param.length > 0) {
			return param.replace(/[a-zA-Z]/g, function (letter) {
				return Tagbase.Format[field][letter];
			});
		} else {
			return Tagbase.Format[field].default;
		}
		
	}
	
	function enpTplBuild (tpl) {
		var _loop 	= curTmake.head._private.loop,
			_loopnum= [],
			_tpl 	= '',
			_n		= 0;
		
		tpl = logicalTagBulid(tpl);
		
		tpl = tpl.replace(/\{(\$[\S\s]*?)\}/g,function(all, letter){
			return getEnpField(letter);
		});
		
		_tpl = tpl;
		
		if(_loop != undefined && _loop.length > 0){
			
			if(core.options.isPreview){
						
				_loop.split('-').forEach(function(element) {
					return _loopnum.push(parseInt(element));
				}, this);
				
				_n = (_loopnum[1] - _loopnum[0]) <= 0 ? 1 : _loopnum[1] - _loopnum[0] + 1;
				
				for(i=1; i<_n; i++){
					_tpl+=tpl;
				}
				
			}else{
				
				tpl = enpWrapperBuild(tpl);		// 构建 wrapper			
				if(_loop != undefined && _loop.length > 0){								
					tpl = enpLoopBuild(tpl, _loop.split('-'));	// 构建 repeat
				}			
				_tpl = html2Escape(tpl)
				
			}
			
		}

		return _tpl;
	}
	
	/**
	 * @param tplstr 标签体源码
	 */
	function logicalTagBulid(tpl){
		//TOM templateObjectModle
		if(core.options.isPreview){
			return tpl;
		}
		else
		{
			tpl = tpl.replace(/<!--\s*(\/?(loop|articlelist|article|class|subclass|attachment))[a-zA-Z0-9\s"'=-]*-->/img,function(all,$1,$2,index){
				var _val = '';
				var _arr = [];
				switch ($1) {
					case 'loop':
							_val = all.match(/\d+-\d+/)[0];
							_arr = _val.split('-');
							_val = '<Repeat Begin=s% End=s%>'.replace(/s%/g,function(){
								return _arr.shift();
							});
						break;
						
					case 'articlelist':				
							_val = all.match(/"(.*)"/)[1];
							_val = '<ArticleList Attr='+translateAttr({attr:_val}).attr+' DaySpan=0 SpanMode=0>';
						break;
						
					case 'subclass':
							_val ='<SubClass SpanMode=0 Attr=+1+2+4+5+6+7>';
						break;
						
					case '/loop':
							_val = '</Repeat>';
						break;
				
					default:
						_val = '<'+ $1.replace($2,function () {	return Tagbase.Command[$2];})+'>';
						break;
				}
				
				return _val;
			});
			return tpl;
		}
		
	}
	
	/**
	 * HTML 转伪码
	 */
	function html2Escape(sHtml) {
		return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'#enpquot#'}[c];});
	}
	
	/**
	 * 解析
	 * @param Tcommand 
	 */
	function rander(Tcommand){
		var _Tcommand = Tcommand,
			_return = '',
			_temp	= '',
			_TmakerHeadAttr = {},
			_TmakerBody = '';
		
		Tcommand = Tcommand.replace(/<!--\s*\/\s*Tmaker\s*-->/,'<!--/#Tmaker-->');
		Tcommand = Tcommand.replace(/<!--\s*Tmaker/,'<!--Tmaker');
		
		_temp = getIndex(Tcommand,/<!--\s*Tmaker .*"\s*-->/);
		
		if(_temp.tag == undefined){
			throwError('Tmaker 标签无效',_Tcommand);
		}
		
		curTmake = {
			headCode : _temp.tag,
			tpl	 : Tcommand.slice(_temp.lastIndex, Tcommand.indexOf('<!--/#Tmaker-->')),
			head : {}
		}

		_TmakerHeadAttr = getTmakerHeadAttr(curTmake.headCode);
		
		_return += _temp.tag.replace('Tmaker','#Tmaker') + '\n';
		_return += enpHeadBuild(_TmakerHeadAttr);
		
		_TmakerBody = getItemFromTpl(curTmake.tpl);
		_TmakerBody = enpTplBuild(_TmakerBody);
		
		_return = _return.replace('{s%}',_TmakerBody);
		
		_return += '\n<!--/#Tmaker-->';

		return _return;
	}
	
	/**
	 * 插入统计代码脚本
	 * 
	 * @param content 网页源码
	 * @returns 插入统计代码脚本后的网页源码
	 */
	function insertWebCountScriptCode( content ){
		return content.replace(/<\/s*body\s*>/,Tagbase.WebCount.field.script+'\n</body>');
	}
	
	core.compile = function (file) {
		
		var top		= "",
			bottom	= "",
			fndx	= "",
			lndx	= "",
			Tstr	= "",
			content = file.contents.toString();

		curFile = file;
		fndx = content.search(/<!--\s*Tmaker/);
		hasWebCount = false;
		
		while (fndx > -1) {
			top		= content.slice(0,fndx);
			curLine = top.match(/\n/g).length;
			content = content.slice(fndx);
			lndx = getIndex(content,/<!--\s*\/\s*Tmaker\s*-->/);
			
			if(lndx == -1){
				console.log('ERROR in file ' + file.path + " tag <!--/Tmaker--> is not found.");
				return file;
			}
			
			Tstr	= content.slice(0, lndx.lastIndex);
			bottom	= content.slice(lndx.lastIndex);
			content = top + rander(Tstr) + bottom;
			fndx	= content.search(/<!--\s*Tmaker/);
		}
		
		if(hasWebCount){
			content = insertWebCountScriptCode(content);
		}
		
		file.contents = new Buffer(content);
		return file;
	}
	
	return core;
})();