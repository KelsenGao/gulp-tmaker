var Vinyl = require('vinyl');
var Tcore = require('./lib/core');
var tagbase = require('./lib/tagbase');
var assert = require('assert');


Tcore.initTmakerOptions({
    isPreview: false,
    lang: 'cn'
});

function createfile(content) {
    var jsFile = new Vinyl({
        cwd: './',
        base: './cache/',
        path: './cache/file.js',
        contents: new Buffer(content)
    });
    return jsFile;
}

function getFileContent(file) {
    return file.contents.toString();
}


describe('访问统计组件', function () {
    var format = tagbase.Format.siteFormat;
    var input = null;
    var arr = null;
    var actual = null;
    var expected = null;

    describe('web-count:content', function () {
        var content = `<!--Tmaker bot="web-count" site="{sitename}" page="content"--><!--/Tmaker-->`;
        var enp = `<!--#Tmaker bot="web-count" site="{pre%}" page="content"-->\n` +
            tagbase.WebCount.field.common + tagbase.WebCount.field.content + `\n<!--/#Tmaker-->`;

        for (var item in format) {
            +function (item) {
                it('site=' + item, function () {
                    input = actual = null;
                    if (format.hasOwnProperty(item)) {
                        arr = [item, format[item]];
                        input = content.replace(/\{sitename\}/, item);
                        actual = enp.replace(/\{pre%\}/g, function () {
                            return arr.shift();
                        });
                    }
                    expected = getFileContent(Tcore.compile(createfile(input)));
                    assert.equal(actual, expected);
                })
            }(item);
        }
    });

    describe('web-count:node', function () {

        var content = `<!--Tmaker bot="web-count" site="{sitename}" page="node"--><!--/Tmaker-->`;
        var enp = `<!--#Tmaker bot="web-count" site="{pre%}" page="node"-->\n` +
            tagbase.WebCount.field.common + tagbase.WebCount.field.node + `\n<!--/#Tmaker-->`;

        for (var item in format) {

            +function (item) {
                it('site=' + item, function () {
                    input = actual = null;
                    if (format.hasOwnProperty(item)) {
                        arr = [item, format[item]];
                        input = content.replace(/\{sitename\}/g, item);
                        actual = enp.replace(/\{pre%\}/g, function () {
                            return arr.shift();
                        });
                    }
                    expected = getFileContent(Tcore.compile(createfile(input)));
                    assert.equal(actual, expected);
                })
            }(item);
        }
    });

    describe('web-count:special', function () {
        content = `<!--Tmaker bot="web-count" site="{sitename}" page="special"--><!--/Tmaker-->`;
        enp = `<!--#Tmaker bot="web-count" site="{pre%}" page="special"-->\n` +
            tagbase.WebCount.field.common + tagbase.WebCount.field.special + `\n<!--/#Tmaker-->`;

        for (var item in format) {
            +function (item) {
                it('site=' + item, function () {
                    input = actual = null;
                    if (format.hasOwnProperty(item)) {
                        arr = [item, format[item], format[item]];
                        input = content.replace(/\{sitename\}/, item);
                        actual = enp.replace(/\{pre%\}/g, function () {
                            return arr.shift();
                        });
                    }
                    expected = getFileContent(Tcore.compile(createfile(input)));

                    assert.equal(actual, expected);

                })
            }(item);
        }
    });

});


describe('微信分享组件', function () {
    var actual = null;
    var expected = null;
    var content = `<!--Tmaker bot="wechat-share" version="1.7.0"--><!--/Tmaker-->`;
    expected = `<!--#Tmaker bot="wechat-share" version="1.7.0"-->\n` + tagbase.WechatShare.field.script + `\n<!--/#Tmaker-->`;
    expected = expected.replace(/\{s%\}/, '1.7.0');

    actual = getFileContent(Tcore.compile(createfile(content)));

    it('all', function () {
        assert.equal(actual, expected);
    })

});



describe('公共置标', function () {

    var Fields = tagbase.CommonField;
    var hasParam = ['$title', '$pubtime']

    for (var field in Fields) {

        switch (field) {
            case '$title':
                +function (field) {
                    it(field, function () {
                        var actual = Tcore.testEnpField(field);
                        assert.equal(actual, Fields[field].replace(/s%/, 0));
                    });

                    it(field + '#previewData', function () {
                        var actual = Tcore.testEnpField(field + '#previewData');
                        assert.equal(actual, Fields[field].replace(/s%/, 0));
                    });

                    it(field + '|18', function () {
                        var actual = Tcore.testEnpField(field + '#|18');
                        assert.equal(actual, Fields[field].replace(/s%/, 18));
                    });


                }(field);
                break;

            case '$pubtime':
                +function (field) {
                    it(field, function () {
                        var actual = Tcore.testEnpField(field);
                        assert.equal(actual, Fields[field].replace(/s%/, 'YearPh-MonthPh-DayPh HourPh:MinutePh:SecondPh'));
                    });

                    it(field + '|Y-M-D h:m:s', function () {
                        var actual = Tcore.testEnpField(field + '|Y-M-D h:m:s');
                        assert.equal(actual, Fields[field].replace(/s%/, 'YearPh-MonthPh-DayPh HourPh:MinutePh:SecondPh'));
                    });

                }(field);
                break;

            default:
                +function (field) {
                    it(field, function () {
                        actual = Tcore.testEnpField(field);
                        assert.equal(actual, Fields[field]);
                    });
                }(field);

                // 带预览数据
                +function (field) {
                    it(field + '#previewData', function () {
                        actual = Tcore.testEnpField(field + '#previewData');
                        assert.equal(actual, Fields[field]);
                    });
                }(field);
                break;
        }

    }
});