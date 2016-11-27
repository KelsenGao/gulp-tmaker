"use strict";

/**
 * 以 $ 开头的字段为可直接替换的标签。如果某个 field 字
 * 段中含有 s% 则必须在 Format 下创建该 field 的默认配
 * 置信息（default）。 请参考 puhtime 
 * 
 */
module.exports = {
	Command:{
		loop	: '<Repeat Begin=s% End=s%>s%</Repeat>',
		class	: 'Class',
		article	: 'Article',
		subclass	: 'SubClass',
		articlelist	: 'ArticleList',
		attachment	: 'EnpAttachment'
	},
	
	CommonField:{
		$pretitle	: '<PreTitle>PreTitlePh</PreTitle>',
		$title		: '<Title length="s%">TitlePh</Title>',
		$id			: '<Id>IdPh</Id>',
		$subtitle	: '<Subtitle>SubtitlePh</Subtitle>',
		$url		: '<Url>ArticleUrlPh</Url>',
		$desc		: '<Abstract>AbstractPh</Abstract>',
		$author		: '<Author>AuthorPh</Author>',
		$editor		: '<Editor>EditorPh</Editor>',
		$liability	: '<Liability>LiabilityPh</Liability>',
		$content	: '<Content>ContentPh</Content>',
		$source		: '<Source>SourcePh</Source>',
		$sourceurl	: '<SourceUrl>SourceUrlPh</SourceUrl>',
		$pubtime 	: '<PubTime Language=1 BriefMonth=0 BriefWeek=0>s%</PubTime>',
		$imgurl		: '<Picture>PictureUrlPh</Picture>',
		$mediaurl	: '<MultiAttach>MultiAttachPh</MultiAttach>',
		$currentname: '<CurrentName>CurrentNamePh</CurrentName>',
		$currenturl : '<CurrentUrl>CurrentUrlPh</CurrentUrl>',
		$mastername	: '<MasterName>MasterNamePh</MasterName>',
		$masterurl	: '<MasterUrl>MasterUrlPh</MasterUrl>',
		$keyword	: '<Keyword>KeywordPh</Keyword>'
	},
	
	Position: {
		config:{
			bot: "ClassPath",
			astyle: "",
			fontstyle: "",
			style: "A:#FONT:",
			flag: "",
			target: "",
			TAG: "BODY",
			PREVIEW: "[当前位置]"
		},
		field : {}
	},
	
	SingleNode:{
		config:{
			bot : "SingleNode",
			style : "A:#IMAGE:#FONT:#TARGET:_blank",
			nodeid : "",
			szinfo : "2",
			TAG : "BODY",
			PREVIEW : "[单个栏目]"
		},
		field : {}
	},
				
	CurrentNode: {
		config:{
			bot : "CurrentNodeInfo",
			style : "A:#FONT:#IMAGE:#PARENT:0#",
			type : "6",
			TAG : "BODY",
			PREVIEW : "[当前栏目]"
		},
		field : {}
	} ,
	
	Content	: {
		config	: {
			bot		: 'AdvContent',
			comstring:'{s%}',
			typeid	: '-1',
			pagenumstyle : 'page',
			pageprefix: '',
			pagepostfix: '',
			pageturnoverstyle: 'next',
			firstpage	: '首页',
			finallypage	: '尾页',
			lastpage	: '上一页',
			nextpage	: '上一页',
			isshow		: '1',
			isshowcode	: '0',
			TAG		: 'BODY',
			PREVIEW : '[高级文章内容]'
		},
		field	: {
			$subscriber : '<Subscriber>SubscriberPh</Subscriber>',
			$attachment : '<Attachment>AttachmentPh</Attachment>',
		}
	},
	
	TitleList:{
		config	: {
			bot	: 'AdvTitleList',
			nodeid	: '',
			type	: '',
			spanmode: 0,
			isshowcode: 0,
			dayspan	: 0,
			attr	: '',
			comstring:'{s%}',
			TAG		: 'BODY',
			PREVIEW : '[高级标题列表]',
			id		: '__enpspecial_'
		},
		field : {	}
	},
	
	ClassList : {
		config : {
			bot		: "AdvClassList",
			isshowcode: "1",
			mode	: "0",
			nodeid	: "0",
			type	: "-1",
			attr	: "",
			classstring: "{s%}",
			TAG		: "BODY",
			PREVIEW	: "[高级栏目列表]",
		},
		field : {
			$classname		: '<ClassName>ClassNamePh</ClassName>',
			$nodeid			: '<NodeId>NodeIdPh</NodeId>',
			$classurl		: '<NodeUrl>ClassUrlPh</NodeUrl>',
			$classnotes		: '<ClassNotes>ClassNotesPh</ClassNotes>',
			$subclasscount	: '<SubclassCount>SubclassCountPh</SubclassCount>',
			$articlecount	: '<ArticleCount>ArticleCountPh</ArticleCount>',
			$length			: '<Length>LengthPh</Length>'
		}
	},
	
	RelatedArticle:{
		config:{
			bot : "AdvRelatedContentLinks",
			comstring : "{s%}",
			isshowcode : "0",
			type : "0",
			TAG : "BODY",
			PREVIEW : "[高级相关稿件列表]"
		},
		field:{}
	},
	
	TitleListPage:{
		config:{
			bot			: "AdvTitleListPage",
			nodeid		: "",
			type		: "",
			spanmode	: "5",
			dayspan		: "40",
			attr		: "",
			comstring	: "{s%}",
			pagenumstyle: "page",
			pageprefix	: "",
			pagepostfix	: "",
			pageturnoverstyle: "next",
			firstpage	: "首页",
			finallypage	: "尾页",
			lastpage	: "上一页",
			nextpage	: "下一页",
			isshow		: "1",
			isshowcode	: "0",
			TAG			:  "BODY",
			PREVIEW		: "[高级分页标题列表]"
		},
		field:{	}
	},
	
	AttachList:{
		config:{
			bot : "AdvAttachmentList",
			nodeid : "0",
			articleid : "0",
			isshowcode : "0",
			atttype : "1",
			attext : "",
			type : "0",
			dayspan : "0",
			comstring : "{s%}",
			TAG : "BODY",
			PREVIEW : "[高级附件列表]",
			id : "__enpspecial_"
		},
		field:{
			$attdesc	: '<EnpDesc>EnpDescPh</EnpDesc>',
			$atturl		: '<EnpAttUrl>EnpAttUrlPh</EnpAttUrl>',
			$ownertitle	: '<EnpOwnerArtTitle>EnpOwnerArtTitlePh</EnpOwnerArtTitle>',
			$ownerurl	: '<EnpOwnerArtUrl>EnpOwnerArtUrlPh</EnpOwnerArtUrl>'
		}
	},
	
	PreNextArticle:{
		config:{
			bot : "PreNextArticle",
			articleturnoverstyle : "PreNextArticle",
			prearticle : "上一篇",
			nextarticle : "下一篇",
			preex : "",
			TAG : "BODY",
			PREVIEW : "[上下篇稿件]",
			id : "__enpspecial_"
		},
		field:{}
	},
	
	keywordTitleList:{
		config:{
			bot : "AdvKeywordTitleList",
			keyword : "",
			type : "",
			spanmode : "0",
			dayspan : "0",
			attr : "",
			comstring : "s%",
			pagenumstyle: "page",
			pageprefix	: "",
			pagepostfix	: "",
			pageturnoverstyle: "next",
			firstpage	: "首页",
			finallypage	: "尾页",
			lastpage	: "上一页",
			nextpage	: "下一页",
			isshow : "0",
			scope : "0",
			isshowcode : "0",
			TAG : "BODY",
			PREVIEW : "[高级关键字列表]"
		},
		field:{}
	},
	
	keywordTitleListPage:{
		config:{
			bot : "AdvKeywordTitleListPage",
			keyword : "",
			type : "",
			spanmode : "0",
			dayspan : "0",
			attr : "",
			comstring : "s%",
			pagenumstyle: "page",
			pageprefix	: "",
			pagepostfix	: "",
			pageturnoverstyle: "next",
			firstpage	: "首页",
			finallypage	: "尾页",
			lastpage	: "上一页",
			nextpage	: "下一页",
			isshow : "0",
			scope : "0",
			isshowcode : "0",
			TAG : "BODY",
			PREVIEW : "[高级关键字分页列表]"
		},
		field:{}
	},
	
	WebCount: {
		config:{
			bot :'WebCount',
			site:'cnmil',
			page:'node'
		},
		field:{
			script: '<!-- Webterren JsCode start-->\n' + 
					'<div style="display:none">' +
					'<script type="text/javascript">' + 
					'document.write(unescape("%3Cscript src=\'http://cl3.webterren.com/webdig.js?z=34\' ' +
					'type=\'text/javascript\'%3E%3C/script%3E"));</script>\n' +
					'<script type="text/javascript">wd_paramtracker("_wdxid=000000000000000000000000000000000000000000")</script>\n' + 
					'</div>\n' + 
					'<!-- Webterren JsCode end-->',
			
			common:
			'<meta name="filetype" content="1">\n'+
			'<meta name="publishedtype" content="1">\n',
			
			node: 	'<meta name="pagetype" content="2">\n' + 
					'<!--webbot bot="AdvClassList" isshowcode="0" mode="0" nodeid="0" type="-5" attr="" '+
					'classstring="&lt;Class&gt;&lt;NodeId&gt;&lt;meta name=#enpquot#catalogs#enpquot# '+
					'content=#enpquot#{pre%}NodeIdPh#enpquot# /&gt;&lt;/NodeId&gt;&lt;/Class&gt;" TAG="BODY" '+
					'PREVIEW="[高级栏目列表]" startspan --><!--webbot bot="AdvClassList" endspan i-checksum="0" -->',
					
			special:'<meta name="pagetype" content="2">\n' + 
					'<!--webbot bot="AdvClassList" isshowcode="0" mode="0" nodeid="0" type="-5" attr="" '+
					'classstring="&lt;Class&gt;&lt;NodeId&gt;&lt;meta name=#enpquot#catalogs#enpquot# '+
					'content=#enpquot#{pre%}NodeIdPh#enpquot# /&gt;&lt;/NodeId&gt;&lt;/Class&gt;" TAG="BODY" '+
					'PREVIEW="[高级栏目列表]" startspan --><!--webbot bot="AdvClassList" endspan i-checksum="0" -->\n'+
					'<!--webbot bot="AdvClassList" isshowcode="0" mode="0" nodeid="0" type="-5" attr="" '+
					'classstring="&lt;Class&gt;&lt;NodeId&gt;&lt;meta name=#enpquot#subject#enpquot# '+
					'content=#enpquot#{pre%}_zt_NodeIdPh#enpquot# /&gt;&lt;/NodeId&gt;&lt;/Class&gt;" TAG="BODY" '+
					'PREVIEW="[高级栏目列表]" startspan --><!--webbot bot="AdvClassList" endspan i-checksum="0" -->',
			
			content:'<meta name="pagetype" content="1" />\n'+
					'<meta name="catalogs" content=""/>\n'+
					'<meta name="_catalogs" content="{pre%}">\n'+
					'<!--webbot bot="AdvContent" '+
					'comstring="&lt;Liability&gt;&lt;meta name=#enpquot#author#enpquot# content=#enpquot#LiabilityPh#enpquot# /&gt;&lt;/Liability&gt;'+
					'&lt;Editor&gt;&lt;meta name=#enpquot#editor#enpquot# content=#enpquot#EditorPh#enpquot# /&gt;&lt;/Editor&gt;'+
					'&lt;Author&gt;&lt;meta name=#enpquot#reporter#enpquot# content=#enpquot#AuthorPh#enpquot# /&gt;&lt;/Author&gt;'+
					'&lt;Id&gt;&lt;meta name=#enpquot#contentid#enpquot# content=#enpquot#IdPh#enpquot# /&gt;&lt;/Id&gt;'+
					'&lt;PubTime Language=1 BriefMonth=0 BriefWeek=0&gt;&lt;meta name=#enpquot#publishdate#enpquot# '+
					'content=#enpquot#YearPh-MonthPh-DayPh#enpquot# /&gt;&lt;/PubTime&gt;"'+
					'typeid="-1" pagenumstyle="" pageprefix="" pagepostfix="" pageturnoverstyle="" firstpage="" '+
					'curpage="" finallypage="" lastpage="" nextpage="" isshow="0" isshowcode="0" TAG="BODY" '+
					'PREVIEW="[高级文章内容]" startspan --><!--webbot bot="AdvContent" endspan i-checksum="0" -->'
		}
	},
	
	WechatShare:{
		config:{
			bot	: 'WechatShare',
			version:'1.0.0'
		},
		field:{
			script:'<script src="http://www.81.cn/res/wxs-{s%}.js"></script>'
		}
	},


	
	Format	: {
		$pubtime : {
			Y:'YearPh',
			M:'MonthPh',
			D:'DayPh ',
			h:'HourPh',
			m:'MinutePh',
			s:'SecondPh',
			default:'YearPh-MonthPh-DayPh HourPh:MinutePh:SecondPh'
		},
		
		field : ['attr','type','szinfo','style','site'],
		attrFormat	: {
			img:'+61',
			headline:'+62',
			default	:'+63',
			all:'+61+62+63'
		},
		typeFormat : {
			parents : "1",
			brothers : "0",
			children : "-1",
			current : "-5",
			name	 : "2",		//CurrentNode
			linkname : "6",		//CurrentNode
			desc	 : '',
			asc	 : '1'
		},
		szinfoFormat:{
			name : '2',
			linkname : '6'
		},
		siteFormat:{
			cnmil : '',
			cnmod : 'S21_',
			enmod : 'S22_',
			touchmod : 'S230_'
		},
		styleFormat:{
			current : 'A:#FONT:#IMAGE:#PARENT:0#',
			parent  : 'A:#FONT:#IMAGE:#PARENT:1#'
		}
	},
	
	Relation	: {
		nodeid	: 'from',
		attr	: 'filter',
		flag	: 'separate',	// 当前位置标签用于拆分连接的标记
		type	: 'order',		// 是否反序 
		szinfo	: 'type'		// 单个栏目显示文本内容
	},
	
	Preview:{		
		CommonField:{
			$pretitle	: 'text|24',
			$title		: 'text|24',
			$id			: 'number|5',
			$nodeid		: 'number|5',
			$subtitle	: 'text|24',
			$url		: 'http://url.Tmaker',
			$desc		: 'text|80',
			$author		: 'nickname|3',
			$editor		: 'nickname|3',
			$liability	: 'nickname|3',
			$content	: 'content|5',
			$source		: 'Tmaker.Word',
			$sourceurl	: 'http://sourceurl.Tmaker',
			$pubtime 	: 'dateTime|Y-M-D h:m:s',
			$imgurl		: 'image',
			$mediaurl	: 'http://mediaurl.Tmaker.com',
			$currentname: '栏目名称',
			$currenturl : 'http://currenturl.Tmaker',
			$mastername	: '父栏目名',
			$masterurl	: 'http://masterurl.Tmaker',
			$classname	: '栏目名称',
			$classurl	: 'http://currenturl.Tmaker',
			$classnotes	: 'text:24',
			$subclasscount	: 'number|1',
			$articlecount	: 'number|3',
			$length		: 'number|4',
			$keyword	: '关键字',
			$attchdesc  : 'text|60',
			$attchurl 	: 'http://attchurl.Tmaker',
			$ownertitle : '附件所属稿件标题',
			$ownerurl: 'http://ownerurl.Tmaker',
			$Subscriber : 'Subscriber',
			$attachment : 'http://attachment.Tmaker'
		},

		NobodyTag : {
			ClassPath:'<a href="#">上级栏目</a><a href="#">上级栏目</a><a href="#">当前栏目</a>',
			SingleNode:'<a href="#">单个栏目</a>',
			CurrentNodeInfo:'<a href="#">当前栏目</a>',
			PreNextArticle:'[上下篇稿件]'
		}
	}
};