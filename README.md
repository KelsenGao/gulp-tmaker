# Ttmaker
Tmaker 是一个模板中间语言解析器,用于实现高效模板开发。其主要有以下功能：

* 中间语言到 HTML 代码的自动转换
* 中间语言到翔宇标签的自动转换（支持所有翔宇标签）
* 自动插入统计代码
* 自动插入微信分享组件
* 扩展标签解析
* 解析并生成文档 Tdoc

# install
Tmaker 基于 gulp 实现，请配置好相关开发环境后运行以下命令安装 Tmaker
```
$npm install --save gulp-tmaker
```
安装完成后在 gulp 中以下面方式部署 Tmaker

```
var Tmaker = requre('gulp-tmaker');

gulp.task('tmaker', function() {
	return gulp.src("*.html")
		.pipe(Tmaker({isPreview:false}))
		.pipe(gulp.dest('./output'));
});
```

# 自定义字段预览格式
提供两种方式定义预览格式，分布为`#`，和`|`:
- `#`之后的内容将直接替换为预览数据
- `|`之后的内容将作为参数影响预览数据