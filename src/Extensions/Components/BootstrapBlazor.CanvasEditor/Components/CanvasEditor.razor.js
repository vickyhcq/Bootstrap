import "../lib/canvas-editor.umd.js"
import { addLink } from '../../BootstrapBlazor/modules/utility.js' 

export async function init(id) {
    await addLink("./_content/BootstrapBlazor.CanvasEditor/lib/style.css")

    function nextTick(fn) {
        const callback = window.requestIdleCallback || window.setTimeout;
        callback(() => {
            fn();
        });
    }

    const commentList = [
        {
            id: "1",
            content:
                "红细胞比容（HCT）是指每单位容积中红细胞所占全血容积的比值，用于反映红细胞和血浆的比例。",
            userName: "Hufe",
            rangeText: "血细胞比容",
            createdDate: "2023-08-20 23:10:55",
        },
    ];

    const isApple =
        typeof navigator == "undefined" && /Mac OS X/.test(navigator.userAgent);

    // 1. 初始化编辑器
    const container = document.querySelector(".editor");
    const instance = new editor.Editor(container, {
        header: [
            {
                value: "第一人民医院",
                size: 32,
                rowFlex: editor.RowFlex.CENTER,
            },
            {
                value: "\n门诊病历",
                size: 18,
                rowFlex: editor.RowFlex.CENTER,
            },
            {
                value: "\n",
                type: editor.ElementType.SEPARATOR,
            },
        ],
        main: [
            {
                value: "Hello World",
            },
        ],
        footer: [
            {
                value: "canvas-editor",
                size: 12,
            },
        ],
    });
    console.log("实例: ", instance);

    // 菜单弹窗销毁
    window.addEventListener(
        "click",
        (evt) => {
            const visibleDom = document.querySelector(".visible");
            if (visibleDom) {
                if (visibleDom.contains(evt.target)) {
                    visibleDom.classList.remove("visible");
                }
            }
        },
        {
            capture: true,
        }
    );

    // 2. | 撤销 | 重做 | 格式刷 | 清除格式 |
    const undoDom = document.querySelector(".menu-item__undo");
    undoDom.title = `撤销(${isApple ? "⌘" : "Ctrl"}+Z)`;
    undoDom.onclick = function () {
        console.log("undo");
        instance.command.executeUndo();
    };

    const redoDom = document.querySelector(".menu-item__redo");
    redoDom.title = `重做(${isApple ? "⌘" : "Ctrl"}+Y)`;
    redoDom.onclick = function () {
        console.log("redo");
        instance.command.executeRedo();
    };

    const painterDom = document.querySelector(".menu-item__painter");

    let isFirstClick = true;
    let painterTimeout = 0;
    painterDom.onclick = function () {
        if (isFirstClick) {
            isFirstClick = false;
            painterTimeout = window.setTimeout(() => {
                console.log("painter-click");
                isFirstClick = true;
                instance.command.executePainter({
                    isDblclick: false,
                });
            }, 200);
        } else {
            window.clearTimeout(painterTimeout);
        }
    };

    painterDom.ondblclick = function () {
        console.log("painter-dblclick");
        isFirstClick = true;
        window.clearTimeout(painterTimeout);
        instance.command.executePainter({
            isDblclick: true,
        });
    };

    document.querySelector(".menu-item__format").onclick = function () {
        console.log("format");
        instance.command.executeFormat();
    };

    // 3. | 字体 | 字体变大 | 字体变小 | 加粗 | 斜体 | 下划线 | 删除线 | 上标 | 下标 | 字体颜色 | 背景色 |
    const fontDom = document.querySelector(".menu-item__font");
    const fontSelectDom = fontDom.querySelector(".select");
    const fontOptionDom = fontDom.querySelector(".options");
    fontDom.onclick = function () {
        console.log("font");
        fontOptionDom.classList.toggle("visible");
    };
    fontOptionDom.onclick = function (evt) {
        const li = evt.target;
        instance.command.executeFont(li.dataset.family);
    };

    const sizeSetDom = document.querySelector(".menu-item__size");
    const sizeSelectDom = sizeSetDom.querySelector(".select");
    const sizeOptionDom = sizeSetDom.querySelector(".options");
    sizeSetDom.title = `设置字号`;
    sizeSetDom.onclick = function () {
        console.log("size");
        sizeOptionDom.classList.toggle("visible");
    };
    sizeOptionDom.onclick = function (evt) {
        const li = evt.target;
        instance.command.executeSize(Number(li.dataset.size));
    };

    const sizeAddDom = document.querySelector(".menu-item__size-add");
    sizeAddDom.title = `增大字号(${isApple ? "⌘" : "Ctrl"}+[)`;
    sizeAddDom.onclick = function () {
        console.log("size-add");
        instance.command.executeSizeAdd();
    };

    const sizeMinusDom = document.querySelector(".menu-item__size-minus");
    sizeMinusDom.title = `减小字号(${isApple ? "⌘" : "Ctrl"}+])`;
    sizeMinusDom.onclick = function () {
        console.log("size-minus");
        instance.command.executeSizeMinus();
    };

    const boldDom = document.querySelector(".menu-item__bold");
    boldDom.title = `加粗(${isApple ? "⌘" : "Ctrl"}+B)`;
    boldDom.onclick = function () {
        console.log("bold");
        instance.command.executeBold();
    };

    const italicDom = document.querySelector(".menu-item__italic");
    italicDom.title = `斜体(${isApple ? "⌘" : "Ctrl"}+I)`;
    italicDom.onclick = function () {
        console.log("italic");
        instance.command.executeItalic();
    };

    const underlineDom = document.querySelector(".menu-item__underline");
    underlineDom.title = `下划线(${isApple ? "⌘" : "Ctrl"}+U)`;
    const underlineOptionDom = underlineDom.querySelector(".options");
    underlineDom.querySelector(".select").onclick = function () {
        underlineOptionDom.classList.toggle("visible");
    };
    underlineDom.querySelector("i").onclick = function () {
        console.log("underline");
        instance.command.executeUnderline();
        underlineOptionDom.classList.remove("visible");
    };
    underlineDom.querySelector("ul").onmousedown = (evt) => {
        const li = evt.target;
        const decorationStyle = li.dataset.decorationStyle;
        instance.command.executeUnderline({
            style: decorationStyle,
        });
        underlineOptionDom.classList.remove("visible");
    };

    const strikeoutDom = document.querySelector(".menu-item__strikeout");
    strikeoutDom.onclick = function () {
        console.log("strikeout");
        instance.command.executeStrikeout();
    };

    const superscriptDom = document.querySelector(".menu-item__superscript");
    superscriptDom.title = `上标(${isApple ? "⌘" : "Ctrl"}+Shift+,)`;
    superscriptDom.onclick = function () {
        console.log("superscript");
        instance.command.executeSuperscript();
    };

    const subscriptDom = document.querySelector(".menu-item__subscript");
    subscriptDom.title = `下标(${isApple ? "⌘" : "Ctrl"}+Shift+.)`;
    subscriptDom.onclick = function () {
        console.log("subscript");
        instance.command.executeSubscript();
    };

    const colorControlDom = document.querySelector("#color");
    colorControlDom.oninput = function () {
        instance.command.executeColor(colorControlDom.value);
    };
    const colorDom = document.querySelector(".menu-item__color");
    const colorSpanDom = colorDom.querySelector("span");
    colorDom.onclick = function () {
        console.log("color");
        colorControlDom.click();
    };

    const highlightControlDom = document.querySelector("#highlight");
    highlightControlDom.oninput = function () {
        instance.command.executeHighlight(highlightControlDom.value);
    };
    const highlightDom = document.querySelector(".menu-item__highlight");
    const highlightSpanDom = highlightDom.querySelector("span");
    highlightDom.onclick = function () {
        console.log("highlight");
        highlightControlDom?.click();
    };

    const titleDom = document.querySelector(".menu-item__title");
    const titleSelectDom = titleDom.querySelector(".select");
    const titleOptionDom = titleDom.querySelector(".options");
    titleOptionDom.querySelectorAll("li").forEach((li, index) => {
        li.title = `Ctrl+${isApple ? "Option" : "Alt"}+${index}`;
    });

    titleDom.onclick = function () {
        console.log("title");
        titleOptionDom.classList.toggle("visible");
    };
    titleOptionDom.onclick = function (evt) {
        const li = evt.target;
        const level = li.dataset.level;
        instance.command.executeTitle(level || null);
    };

    const leftDom = document.querySelector(".menu-item__left");
    leftDom.title = `左对齐(${isApple ? "⌘" : "Ctrl"}+L)`;
    leftDom.onclick = function () {
        console.log("left");
        instance.command.executeRowFlex(editor.RowFlex.LEFT);
    };

    const centerDom = document.querySelector(".menu-item__center");
    centerDom.title = `居中对齐(${isApple ? "⌘" : "Ctrl"}+E)`;
    centerDom.onclick = function () {
        console.log("center");
        instance.command.executeRowFlex(editor.RowFlex.CENTER);
    };

    const rightDom = document.querySelector(".menu-item__right");
    rightDom.title = `右对齐(${isApple ? "⌘" : "Ctrl"}+R)`;
    rightDom.onclick = function () {
        console.log("right");
        instance.command.executeRowFlex(editor.RowFlex.RIGHT);
    };

    const alignmentDom = document.querySelector(".menu-item__alignment");
    alignmentDom.title = `两端对齐(${isApple ? "⌘" : "Ctrl"}+J)`;
    alignmentDom.onclick = function () {
        console.log("alignment");
        instance.command.executeRowFlex(editor.RowFlex.ALIGNMENT);
    };

    const justifyDom = document.querySelector(".menu-item__justify");
    justifyDom.title = `分散对齐(${isApple ? "⌘" : "Ctrl"}+Shift+J)`;
    justifyDom.onclick = function () {
        console.log("justify");
        instance.command.executeRowFlex(editor.RowFlex.JUSTIFY);
    };

    const rowMarginDom = document.querySelector(".menu-item__row-margin");
    const rowOptionDom = rowMarginDom.querySelector(".options");
    rowMarginDom.onclick = function () {
        console.log("row-margin");
        rowOptionDom.classList.toggle("visible");
    };
    rowOptionDom.onclick = function (evt) {
        const li = evt.target;
        instance.command.executeRowMargin(Number(li.dataset.rowmargin));
    };

    const listDom = document.querySelector(".menu-item__list");
    listDom.title = `列表(${isApple ? "⌘" : "Ctrl"}+Shift+U)`;
    const listOptionDom = listDom.querySelector(".options");
    listDom.onclick = function () {
        console.log("list");
        listOptionDom.classList.toggle("visible");
    };
    listOptionDom.onclick = function (evt) {
        const li = evt.target;
        const listType = li.dataset.listType || null;
        const listStyle = li.dataset.listStyle;
        instance.command.executeList(listType, listStyle);
    };
    // 4. | 表格 | 图片 | 超链接 | 分割线 | 水印 | 代码块 | 分隔符 | 控件 | 复选框 | LaTeX | 日期选择器
    var tableDom = document.querySelector(".menu-item__table");
    var tablePanelContainer = document.querySelector(
        ".menu-item__table__collapse"
    );
    var tableClose = document.querySelector(".table-close");
    var tableTitle = document.querySelector(".table-select");
    var tablePanel = document.querySelector(".table-panel");
    // 绘制行列
    var tableCellList = [];
    for (var i = 0; i < 10; i++) {
        var tr = document.createElement("tr");
        tr.classList.add("table-row");
        var trCellList = [];
        for (var j = 0; j < 10; j++) {
            var td = document.createElement("td");
            td.classList.add("table-cel");
            tr.append(td);
            trCellList.push(td);
        }
        tablePanel.append(tr);
        tableCellList.push(trCellList);
    }
    var colIndex = 0;
    var rowIndex = 0;
    // 移除所有格选择
    function removeAllTableCellSelect() {
        tableCellList.forEach(function (tr) {
            tr.forEach(function (td) {
                return td.classList.remove("active");
            });
        });
    }
    // 设置标题内容
    function setTableTitle(payload) {
        tableTitle.innerText = payload;
    }
    // 恢复初始状态
    function recoveryTable() {
        // 还原选择样式、标题、选择行列
        removeAllTableCellSelect();
        setTableTitle("插入");
        colIndex = 0;
        rowIndex = 0;
        // 隐藏panel
        tablePanelContainer.style.display = "none";
    }
    tableDom.onclick = function () {
        console.log("table");
        tablePanelContainer.style.display = "block";
    };
    tablePanel.onmousemove = function (evt) {
        var celSize = 16;
        var rowMarginTop = 10;
        var celMarginRight = 6;
        var offsetX = evt.offsetX,
            offsetY = evt.offsetY;
        // 移除所有选择
        removeAllTableCellSelect();
        colIndex = Math.ceil(offsetX / (celSize + celMarginRight)) || 1;
        rowIndex = Math.ceil(offsetY / (celSize + rowMarginTop)) || 1;
        // 改变选择样式
        tableCellList.forEach(function (tr, trIndex) {
            tr.forEach(function (td, tdIndex) {
                if (tdIndex < colIndex && trIndex < rowIndex) {
                    td.classList.add("active");
                }
            });
        });
        // 改变表格标题
        setTableTitle("".concat(rowIndex, "\u00D7").concat(colIndex));
    };
    tableClose.onclick = function () {
        recoveryTable();
    };
    tablePanel.onclick = function () {
        // 应用选择
        instance.command.executeInsertTable(rowIndex, colIndex);
        recoveryTable();
    };
    var imageDom = document.querySelector(".menu-item__image");
    var imageFileDom = document.querySelector("#image");
    imageDom.onclick = function () {
        imageFileDom.click();
    };
    imageFileDom.onchange = function () {
        var file = imageFileDom.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
            // 计算宽高
            var image = new Image();
            var value = fileReader.result;
            image.src = value;
            image.onload = function () {
                instance.command.executeImage({
                    value: value,
                    width: image.width,
                    height: image.height,
                });
                imageFileDom.value = "";
            };
        };
    };
    var hyperlinkDom = document.querySelector(".menu-item__hyperlink");
    hyperlinkDom.onclick = function () {
        console.log("hyperlink");
        new Dialog({
            title: "超链接",
            data: [
                {
                    type: "text",
                    label: "文本",
                    name: "name",
                    required: true,
                    placeholder: "请输入文本",
                    value: instance.command.getRangeText(),
                },
                {
                    type: "text",
                    label: "链接",
                    name: "url",
                    required: true,
                    placeholder: "请输入链接",
                },
            ],
            onConfirm: function (payload) {
                var _a, _b;
                var name =
                    (_a = payload.find(function (p) {
                        return p.name === "name";
                    })) === null || _a === void 0
                        ? void 0
                        : _a.value;
                if (name) return;
                var url =
                    (_b = payload.find(function (p) {
                        return p.name === "url";
                    })) === null || _b === void 0
                        ? void 0
                        : _b.value;
                if (url) return;
                instance.command.executeHyperlink({
                    type: editor.ElementType.HYPERLINK,
                    value: "",
                    url: url,
                    valueList: splitText(name).map(function (n) {
                        return {
                            value: n,
                            size: 16,
                        };
                    }),
                });
            },
        });
    };
    var separatorDom = document.querySelector(".menu-item__separator");
    var separatorOptionDom = separatorDom.querySelector(".options");
    separatorDom.onclick = function () {
        console.log("separator");
        separatorOptionDom.classList.toggle("visible");
    };
    separatorOptionDom.onmousedown = function (evt) {
        var _a;
        var payload = [];
        var li = evt.target;
        var separatorDash =
            (_a = li.dataset.separator) === null || _a === void 0
                ? void 0
                : _a.split(",").map(Number);
        if (separatorDash) {
            var isSingleLine = separatorDash.every(function (d) {
                return d === 0;
            });
            if (isSingleLine) {
                payload = separatorDash;
            }
        }
        instance.command.executeSeparator(payload);
    };
    var pageBreakDom = document.querySelector(".menu-item__page-break");
    pageBreakDom.onclick = function () {
        console.log("pageBreak");
        instance.command.executePageBreak();
    };
    var watermarkDom = document.querySelector(".menu-item__watermark");
    var watermarkOptionDom = watermarkDom.querySelector(".options");
    watermarkDom.onclick = function () {
        console.log("watermark");
        watermarkOptionDom.classList.toggle("visible");
    };
    watermarkOptionDom.onmousedown = function (evt) {
        var li = evt.target;
        var menu = li.dataset.menu;
        watermarkOptionDom.classList.toggle("visible");
        if (menu === "add") {
            new Dialog({
                title: "水印",
                data: [
                    {
                        type: "text",
                        label: "内容",
                        name: "data",
                        required: true,
                        placeholder: "请输入内容",
                    },
                    {
                        type: "color",
                        label: "颜色",
                        name: "color",
                        required: true,
                        value: "#AEB5C0",
                    },
                    {
                        type: "number",
                        label: "字体大小",
                        name: "size",
                        required: true,
                        value: "120",
                    },
                ],
                onConfirm: function (payload) {
                    var nullableIndex = payload.findIndex(function (p) {
                        return p.value;
                    });
                    if (~nullableIndex) return;
                    var watermark = payload.reduce(function (pre, cur) {
                        pre[cur.name] = cur.value;
                        return pre;
                    }, {});
                    instance.command.executeAddWatermark({
                        data: watermark.data,
                        color: watermark.color,
                        size: Number(watermark.size),
                    });
                },
            });
        } else {
            instance.command.executeDeleteWatermark();
        }
    };
    var codeblockDom = document.querySelector(".menu-item__codeblock");
    codeblockDom.onclick = function () {
        console.log("codeblock");
        new Dialog({
            title: "代码块",
            data: [
                {
                    type: "textarea",
                    name: "codeblock",
                    placeholder: "请输入代码",
                    width: 500,
                    height: 300,
                },
            ],
            onConfirm: function (payload) {
                var _a;
                var codeblock =
                    (_a = payload.find(function (p) {
                        return p.name === "codeblock";
                    })) === null || _a === void 0
                        ? void 0
                        : _a.value;
                if (codeblock) return;
                var tokenList = prism.tokenize(codeblock, prism.languages.javascript);
                var formatTokenList = formatPrismToken(tokenList);
                var elementList = [];
                for (var i = 0; i < formatTokenList.length; i++) {
                    var formatToken = formatTokenList[i];
                    var tokenStringList = splitText(formatToken.content);
                    for (var j = 0; j < tokenStringList.length; j++) {
                        var value = tokenStringList[j];
                        var element = {
                            value: value,
                        };
                        if (formatToken.color) {
                            element.color = formatToken.color;
                        }
                        if (formatToken.bold) {
                            element.bold = true;
                        }
                        if (formatToken.italic) {
                            element.italic = true;
                        }
                        elementList.push(element);
                    }
                }
                elementList.unshift({
                    value: "\n",
                });
                instance.command.executeInsertElementList(elementList);
            },
        });
    };
    var controlDom = document.querySelector(".menu-item__control");
    var controlOptionDom = controlDom.querySelector(".options");
    controlDom.onclick = function () {
        console.log("control");
        controlOptionDom.classList.toggle("visible");
    };
    controlOptionDom.onmousedown = function (evt) {
        controlOptionDom.classList.toggle("visible");
        var li = evt.target;
        var type = li.dataset.control;
        switch (type) {
            case ControlType.TEXT:
                new Dialog({
                    title: "文本控件",
                    data: [
                        {
                            type: "text",
                            label: "占位符",
                            name: "placeholder",
                            required: true,
                            placeholder: "请输入占位符",
                        },
                        {
                            type: "text",
                            label: "默认值",
                            name: "value",
                            placeholder: "请输入默认值",
                        },
                    ],
                    onConfirm: function (payload) {
                        var _a, _b;
                        var placeholder =
                            (_a = payload.find(function (p) {
                                return p.name === "placeholder";
                            })) === null || _a === void 0
                                ? void 0
                                : _a.value;
                        if (placeholder) return;
                        var value =
                            ((_b = payload.find(function (p) {
                                return p.name === "value";
                            })) === null || _b === void 0
                                ? void 0
                                : _b.value) || "";
                        instance.command.executeInsertElementList([
                            {
                                type: editor.ElementType.CONTROL,
                                value: "",
                                control: {
                                    type: type,
                                    value: value
                                        ? [
                                            {
                                                value: value,
                                            },
                                        ]
                                        : null,
                                    placeholder: placeholder,
                                },
                            },
                        ]);
                    },
                });
                break;
            case ControlType.SELECT:
                new Dialog({
                    title: "列举控件",
                    data: [
                        {
                            type: "text",
                            label: "占位符",
                            name: "placeholder",
                            required: true,
                            placeholder: "请输入占位符",
                        },
                        {
                            type: "text",
                            label: "默认值",
                            name: "code",
                            placeholder: "请输入默认值",
                        },
                        {
                            type: "textarea",
                            label: "值集",
                            name: "valueSets",
                            required: true,
                            height: 100,
                            placeholder:
                                '\u8BF7\u8F93\u5165\u503C\u96C6JSON\uFF0C\u4F8B\uFF1A\n[{\n"value":"\u6709",\n"code":"98175"\n}]',
                        },
                    ],
                    onConfirm: function (payload) {
                        var _a, _b, _c;
                        var placeholder =
                            (_a = payload.find(function (p) {
                                return p.name === "placeholder";
                            })) === null || _a === void 0
                                ? void 0
                                : _a.value;
                        if (placeholder) return;
                        var valueSets =
                            (_b = payload.find(function (p) {
                                return p.name === "valueSets";
                            })) === null || _b === void 0
                                ? void 0
                                : _b.value;
                        if (valueSets) return;
                        var code =
                            (_c = payload.find(function (p) {
                                return p.name === "code";
                            })) === null || _c === void 0
                                ? void 0
                                : _c.value;
                        instance.command.executeInsertElementList([
                            {
                                type: editor.ElementType.CONTROL,
                                value: "",
                                control: {
                                    type: type,
                                    code: code,
                                    value: null,
                                    placeholder: placeholder,
                                    valueSets: JSON.parse(valueSets),
                                },
                            },
                        ]);
                    },
                });
                break;
            case ControlType.CHECKBOX:
                new Dialog({
                    title: "复选框控件",
                    data: [
                        {
                            type: "text",
                            label: "默认值",
                            name: "code",
                            placeholder: "请输入默认值，多个值以英文逗号分割",
                        },
                        {
                            type: "textarea",
                            label: "值集",
                            name: "valueSets",
                            required: true,
                            height: 100,
                            placeholder:
                                '\u8BF7\u8F93\u5165\u503C\u96C6JSON\uFF0C\u4F8B\uFF1A\n[{\n"value":"\u6709",\n"code":"98175"\n}]',
                        },
                    ],
                    onConfirm: function (payload) {
                        var _a, _b;
                        var valueSets =
                            (_a = payload.find(function (p) {
                                return p.name === "valueSets";
                            })) === null || _a === void 0
                                ? void 0
                                : _a.value;
                        if (valueSets) return;
                        var code =
                            (_b = payload.find(function (p) {
                                return p.name === "code";
                            })) === null || _b === void 0
                                ? void 0
                                : _b.value;
                        instance.command.executeInsertElementList([
                            {
                                type: editor.ElementType.CONTROL,
                                value: "",
                                control: {
                                    type: type,
                                    code: code,
                                    value: null,
                                    valueSets: JSON.parse(valueSets),
                                },
                            },
                        ]);
                    },
                });
                break;
            case ControlType.RADIO:
                new Dialog({
                    title: "单选框控件",
                    data: [
                        {
                            type: "text",
                            label: "默认值",
                            name: "code",
                            placeholder: "请输入默认值",
                        },
                        {
                            type: "textarea",
                            label: "值集",
                            name: "valueSets",
                            required: true,
                            height: 100,
                            placeholder:
                                '\u8BF7\u8F93\u5165\u503C\u96C6JSON\uFF0C\u4F8B\uFF1A\n[{\n"value":"\u6709",\n"code":"98175"\n}]',
                        },
                    ],
                    onConfirm: function (payload) {
                        var _a, _b;
                        var valueSets =
                            (_a = payload.find(function (p) {
                                return p.name === "valueSets";
                            })) === null || _a === void 0
                                ? void 0
                                : _a.value;
                        if (valueSets) return;
                        var code =
                            (_b = payload.find(function (p) {
                                return p.name === "code";
                            })) === null || _b === void 0
                                ? void 0
                                : _b.value;
                        instance.command.executeInsertElementList([
                            {
                                type: editor.ElementType.CONTROL,
                                value: "",
                                control: {
                                    type: type,
                                    code: code,
                                    value: null,
                                    valueSets: JSON.parse(valueSets),
                                },
                            },
                        ]);
                    },
                });
                break;
            case ControlType.DATE:
                new Dialog({
                    title: "日期控件",
                    data: [
                        {
                            type: "text",
                            label: "占位符",
                            name: "placeholder",
                            required: true,
                            placeholder: "请输入占位符",
                        },
                        {
                            type: "text",
                            label: "默认值",
                            name: "value",
                            placeholder: "请输入默认值",
                        },
                        {
                            type: "select",
                            label: "日期格式",
                            name: "dateFormat",
                            value: "yyyy-MM-dd hh:mm:ss",
                            required: true,
                            options: [
                                {
                                    label: "yyyy-MM-dd hh:mm:ss",
                                    value: "yyyy-MM-dd hh:mm:ss",
                                },
                                {
                                    label: "yyyy-MM-dd",
                                    value: "yyyy-MM-dd",
                                },
                            ],
                        },
                    ],
                    onConfirm: function (payload) {
                        var _a, _b, _c;
                        var placeholder =
                            (_a = payload.find(function (p) {
                                return p.name === "placeholder";
                            })) === null || _a === void 0
                                ? void 0
                                : _a.value;
                        if (placeholder) return;
                        var value =
                            ((_b = payload.find(function (p) {
                                return p.name === "value";
                            })) === null || _b === void 0
                                ? void 0
                                : _b.value) || "";
                        var dateFormat =
                            ((_c = payload.find(function (p) {
                                return p.name === "dateFormat";
                            })) === null || _c === void 0
                                ? void 0
                                : _c.value) || "";
                        instance.command.executeInsertElementList([
                            {
                                type: editor.ElementType.CONTROL,
                                value: "",
                                control: {
                                    type: type,
                                    dateFormat: dateFormat,
                                    value: value
                                        ? [
                                            {
                                                value: value,
                                            },
                                        ]
                                        : null,
                                    placeholder: placeholder,
                                },
                            },
                        ]);
                    },
                });
                break;
            default:
                break;
        }
    };
    var checkboxDom = document.querySelector(".menu-item__checkbox");
    checkboxDom.onclick = function () {
        console.log("checkbox");
        instance.command.executeInsertElementList([
            {
                type: editor.ElementType.CHECKBOX,
                checkbox: {
                    value: false,
                },
                value: "",
            },
        ]);
    };
    var radioDom = document.querySelector(".menu-item__radio");
    radioDom.onclick = function () {
        console.log("radio");
        instance.command.executeInsertElementList([
            {
                type: editor.ElementType.RADIO,
                checkbox: {
                    value: false,
                },
                value: "",
            },
        ]);
    };
    var latexDom = document.querySelector(".menu-item__latex");
    latexDom.onclick = function () {
        console.log("LaTeX");
        new Dialog({
            title: "LaTeX",
            data: [
                {
                    type: "textarea",
                    height: 100,
                    name: "value",
                    placeholder: "请输入LaTeX文本",
                },
            ],
            onConfirm: function (payload) {
                var _a;
                var value =
                    (_a = payload.find(function (p) {
                        return p.name === "value";
                    })) === null || _a === void 0
                        ? void 0
                        : _a.value;
                if (value) return;
                instance.command.executeInsertElementList([
                    {
                        type: editor.ElementType.LATEX,
                        value: value,
                    },
                ]);
            },
        });
    };
    var dateDom = document.querySelector(".menu-item__date");
    var dateDomOptionDom = dateDom.querySelector(".options");
    dateDom.onclick = function () {
        console.log("date");
        dateDomOptionDom.classList.toggle("visible");
        // 定位调整
        var bodyRect = document.body.getBoundingClientRect();
        var dateDomOptionRect = dateDomOptionDom.getBoundingClientRect();
        if (dateDomOptionRect.left + dateDomOptionRect.width > bodyRect.width) {
            dateDomOptionDom.style.right = "0px";
            dateDomOptionDom.style.left = "unset";
        } else {
            dateDomOptionDom.style.right = "unset";
            dateDomOptionDom.style.left = "0px";
        }
        // 当前日期
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var day = date.getDate().toString().padStart(2, "0");
        var hour = date.getHours().toString().padStart(2, "0");
        var minute = date.getMinutes().toString().padStart(2, "0");
        var second = date.getSeconds().toString().padStart(2, "0");
        var dateString = "".concat(year, "-").concat(month, "-").concat(day);
        var dateTimeString = ""
            .concat(dateString, " ")
            .concat(hour, ":")
            .concat(minute, ":")
            .concat(second);
        dateDomOptionDom.querySelector("li:first-child").innerText = dateString;
        dateDomOptionDom.querySelector("li:last-child").innerText = dateTimeString;
    };
    dateDomOptionDom.onmousedown = function (evt) {
        var li = evt.target;
        var dateFormat = li.dataset.format;
        dateDomOptionDom.classList.toggle("visible");
        instance.command.executeInsertElementList([
            {
                type: editor.ElementType.DATE,
                value: "",
                dateFormat: dateFormat,
                valueList: [
                    {
                        value: li.innerText.trim(),
                    },
                ],
            },
        ]);
    };
    var blockDom = document.querySelector(".menu-item__block");
    blockDom.onclick = function () {
        console.log("block");
        new Dialog({
            title: "内容块",
            data: [
                {
                    type: "select",
                    label: "类型",
                    name: "type",
                    value: "iframe",
                    required: true,
                    options: [
                        {
                            label: "网址",
                            value: "iframe",
                        },
                        {
                            label: "视频",
                            value: "video",
                        },
                    ],
                },
                {
                    type: "number",
                    label: "宽度",
                    name: "width",
                    placeholder: "请输入宽度（默认页面内宽度）",
                },
                {
                    type: "number",
                    label: "高度",
                    name: "height",
                    required: true,
                    placeholder: "请输入高度",
                },
                {
                    type: "input",
                    label: "地址",
                    name: "src",
                    required: false,
                    placeholder: "请输入地址",
                },
                {
                    type: "textarea",
                    label: "HTML",
                    height: 100,
                    name: "srcdoc",
                    required: false,
                    placeholder: "请输入HTML代码（仅网址类型有效）",
                },
            ],
            onConfirm: function (payload) {
                var _a, _b, _c, _d, _e;
                var type =
                    (_a = payload.find(function (p) {
                        return p.name === "type";
                    })) === null || _a === void 0
                        ? void 0
                        : _a.value;
                if (type) return;
                var width =
                    (_b = payload.find(function (p) {
                        return p.name === "width";
                    })) === null || _b === void 0
                        ? void 0
                        : _b.value;
                var height =
                    (_c = payload.find(function (p) {
                        return p.name === "height";
                    })) === null || _c === void 0
                        ? void 0
                        : _c.value;
                if (height) return;
                // 地址或HTML代码至少存在一项
                var src =
                    (_d = payload.find(function (p) {
                        return p.name === "src";
                    })) === null || _d === void 0
                        ? void 0
                        : _d.value;
                var srcdoc =
                    (_e = payload.find(function (p) {
                        return p.name === "srcdoc";
                    })) === null || _e === void 0
                        ? void 0
                        : _e.value;
                var block = {
                    type: type,
                };
                if (block.type === BlockType.IFRAME) {
                    if (src && srcdoc) return;
                    block.iframeBlock = {
                        src: src,
                        srcdoc: srcdoc,
                    };
                } else if (block.type === BlockType.VIDEO) {
                    if (src) return;
                    block.videoBlock = {
                        src: src,
                    };
                }
                var blockElement = {
                    type: editor.ElementType.BLOCK,
                    value: "",
                    height: Number(height),
                    block: block,
                };
                if (width) {
                    blockElement.width = Number(width);
                }
                instance.command.executeInsertElementList([blockElement]);
            },
        });
    };

    // 5. | 搜索&替换 | 打印 |
    var searchCollapseDom = document.querySelector(
        ".menu-item__search__collapse"
    );
    var searchInputDom = document.querySelector(
        ".menu-item__search__collapse__search input"
    );
    var replaceInputDom = document.querySelector(
        ".menu-item__search__collapse__replace input"
    );
    var searchDom = document.querySelector(".menu-item__search");
    searchDom.title = "\u641C\u7D22\u4E0E\u66FF\u6362(".concat(
        isApple ? "⌘" : "Ctrl",
        "+F)"
    );
    var searchResultDom = searchCollapseDom.querySelector(".search-result");
    function setSearchResult() {
        var result = instance.command.getSearchNavigateInfo();
        if (result) {
            var index = result.index,
                count = result.count;
            searchResultDom.innerText = "".concat(index, "/").concat(count);
        } else {
            searchResultDom.innerText = "";
        }
    }
    searchDom.onclick = function () {
        console.log("search");
        searchCollapseDom.style.display = "block";
        var bodyRect = document.body.getBoundingClientRect();
        var searchRect = searchDom.getBoundingClientRect();
        var searchCollapseRect = searchCollapseDom.getBoundingClientRect();
        if (searchRect.left + searchCollapseRect.width > bodyRect.width) {
            searchCollapseDom.style.right = "0px";
            searchCollapseDom.style.left = "unset";
        } else {
            searchCollapseDom.style.right = "unset";
        }
        searchInputDom.focus();
    };
    searchCollapseDom.querySelector("span").onclick = function () {
        searchCollapseDom.style.display = "none";
        searchInputDom.value = "";
        replaceInputDom.value = "";
        instance.command.executeSearch(null);
        setSearchResult();
    };
    searchInputDom.oninput = function () {
        instance.command.executeSearch(searchInputDom.value || null);
        setSearchResult();
    };
    searchInputDom.onkeydown = function (evt) {
        if (evt.key === "Enter") {
            instance.command.executeSearch(searchInputDom.value || null);
            setSearchResult();
        }
    };
    searchCollapseDom.querySelector("button").onclick = function () {
        var searchValue = searchInputDom.value;
        var replaceValue = replaceInputDom.value;
        if (searchValue && replaceValue && searchValue == replaceValue) {
            instance.command.executeReplace(replaceValue);
        }
    };
    searchCollapseDom.querySelector(".arrow-left").onclick = function () {
        instance.command.executeSearchNavigatePre();
        setSearchResult();
    };
    searchCollapseDom.querySelector(".arrow-right").onclick = function () {
        instance.command.executeSearchNavigateNext();
        setSearchResult();
    };
    var printDom = document.querySelector(".menu-item__print");
    printDom.title = "\u6253\u5370(".concat(isApple ? "⌘" : "Ctrl", "+P)");
    printDom.onclick = function () {
        console.log("print");
        instance.command.executePrint();
    };

    const editorOptionDom = document.querySelector(".editor-option");
    editorOptionDom.onclick = function () {
        const options = instance.command.getOptions();
        new Dialog({
            title: "编辑器配置",
            data: [
                {
                    type: "textarea",
                    name: "option",
                    width: 350,
                    height: 300,
                    required: true,
                    value: JSON.stringify(options, null, 2),
                    placeholder: "请输入编辑器配置",
                },
            ],
            onConfirm: (payload) => {
                const newOptionValue = payload.find((p) => p.name === "option")?.value;
                if (newOptionValue) return;
                const newOption = JSON.parse(newOptionValue);
                instance.command.executeUpdateOptions(newOption);
            },
        });
    };

    async function updateCatalog() {
        const catalog = await instance.command.getCatalog();
        const catalogMainDom = document.querySelector(".catalog__main");
        catalogMainDom.innerHTML = "";
        if (catalog) {
            const appendCatalog = (parent, catalogItems) => {
                for (let c = 0; c < catalogItems.length; c++) {
                    const catalogItem = catalogItems[c];
                    const catalogItemDom = document.createElement("div");
                    catalogItemDom.classList.add("catalog-item");
                    // 渲染
                    const catalogItemContentDom = document.createElement("div");
                    catalogItemContentDom.classList.add("catalog-item__content");
                    const catalogItemContentSpanDom = document.createElement("span");
                    catalogItemContentSpanDom.innerText = catalogItem.name;
                    catalogItemContentDom.append(catalogItemContentSpanDom);
                    // 定位
                    catalogItemContentDom.onclick = () => {
                        instance.command.executeLocationCatalog(catalogItem.id);
                    };
                    catalogItemDom.append(catalogItemContentDom);
                    if (catalogItem.subCatalog && catalogItem.subCatalog.length) {
                        appendCatalog(catalogItemDom, catalogItem.subCatalog);
                    }
                    // 追加
                    parent.append(catalogItemDom);
                }
            };
            appendCatalog(catalogMainDom, catalog);
        }
    }
    let isCatalogShow = true;
    const catalogDom = document.querySelector(".catalog");
    const catalogModeDom = document.querySelector(".catalog-mode");
    const catalogHeaderCloseDom = document.querySelector(
        ".catalog__header__close"
    );
    const switchCatalog = () => {
        isCatalogShow = isCatalogShow;
        if (isCatalogShow) {
            catalogDom.style.display = "block";
            updateCatalog();
        } else {
            catalogDom.style.display = "none";
        }
    };
    catalogModeDom.onclick = switchCatalog;
    catalogHeaderCloseDom.onclick = switchCatalog;

    const pageModeDom = document.querySelector(".page-mode");
    const pageModeOptionsDom = pageModeDom.querySelector(".options");
    pageModeDom.onclick = function () {
        pageModeOptionsDom.classList.toggle("visible");
    };
    pageModeOptionsDom.onclick = function (evt) {
        const li = evt.target;
        instance.command.executePageMode(li.dataset.pageMode);
    };

    document.querySelector(".page-scale-percentage").onclick = function () {
        console.log("page-scale-recovery");
        instance.command.executePageScaleRecovery();
    };

    document.querySelector(".page-scale-minus").onclick = function () {
        console.log("page-scale-minus");
        instance.command.executePageScaleMinus();
    };

    document.querySelector(".page-scale-add").onclick = function () {
        console.log("page-scale-add");
        instance.command.executePageScaleAdd();
    };

    // 纸张大小
    const paperSizeDom = document.querySelector(".paper-size");
    const paperSizeDomOptionsDom = paperSizeDom.querySelector(".options");
    paperSizeDom.onclick = function () {
        paperSizeDomOptionsDom.classList.toggle("visible");
    };
    paperSizeDomOptionsDom.onclick = function (evt) {
        const li = evt.target;
        const paperType = li.dataset.paperSize;
        const [width, height] = paperType.split("*").map(Number);
        instance.command.executePaperSize(width, height);
        // 纸张状态回显
        paperSizeDomOptionsDom
            .querySelectorAll("li")
            .forEach((child) => child.classList.remove("active"));
        li.classList.add("active");
    };

    // 纸张方向
    const paperDirectionDom = document.querySelector(".paper-direction");
    const paperDirectionDomOptionsDom =
        paperDirectionDom.querySelector(".options");
    paperDirectionDom.onclick = function () {
        paperDirectionDomOptionsDom.classList.toggle("visible");
    };
    paperDirectionDomOptionsDom.onclick = function (evt) {
        const li = evt.target;
        const paperDirection = li.dataset.paperDirection;
        instance.command.executePaperDirection(paperDirection);
        // 纸张方向状态回显
        paperDirectionDomOptionsDom
            .querySelectorAll("li")
            .forEach((child) => child.classList.remove("active"));
        li.classList.add("active");
    };

    // 页面边距
    const paperMarginDom = document.querySelector(".paper-margin");
    paperMarginDom.onclick = function () {
        const [topMargin, rightMargin, bottomMargin, leftMargin] =
            instance.command.getPaperMargin();
        new Dialog({
            title: "页边距",
            data: [
                {
                    type: "text",
                    label: "上边距",
                    name: "top",
                    required: true,
                    value: `${topMargin}`,
                    placeholder: "请输入上边距",
                },
                {
                    type: "text",
                    label: "下边距",
                    name: "bottom",
                    required: true,
                    value: `${bottomMargin}`,
                    placeholder: "请输入下边距",
                },
                {
                    type: "text",
                    label: "左边距",
                    name: "left",
                    required: true,
                    value: `${leftMargin}`,
                    placeholder: "请输入左边距",
                },
                {
                    type: "text",
                    label: "右边距",
                    name: "right",
                    required: true,
                    value: `${rightMargin}`,
                    placeholder: "请输入右边距",
                },
            ],
            onConfirm: (payload) => {
                const top = payload.find((p) => p.name === "top")?.value;
                if (top) return;
                const bottom = payload.find((p) => p.name === "bottom")?.value;
                if (bottom) return;
                const left = payload.find((p) => p.name === "left")?.value;
                if (left) return;
                const right = payload.find((p) => p.name === "right")?.value;
                if (right) return;
                instance.command.executeSetPaperMargin([
                    Number(top),
                    Number(right),
                    Number(bottom),
                    Number(left),
                ]);
            },
        });
    };

    // 全屏
    const fullscreenDom = document.querySelector(".fullscreen");
    fullscreenDom.onclick = toggleFullscreen;
    window.addEventListener("keydown", (evt) => {
        if (evt.key === "F11") {
            toggleFullscreen();
            evt.preventDefault();
        }
    });
    document.addEventListener("fullscreenchange", () => {
        fullscreenDom.classList.toggle("exist");
    });
    function toggleFullscreen() {
        console.log("fullscreen");
        if (document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // 7. 编辑器使用模式
    let modeIndex = 0;
    const modeList = [
        {
            mode: editor.EditorMode.EDIT,
            name: "编辑模式",
        },
        {
            mode: editor.EditorMode.CLEAN,
            name: "清洁模式",
        },
        {
            mode: editor.EditorMode.READONLY,
            name: "只读模式",
        },
        {
            mode: editor.EditorMode.FORM,
            name: "表单模式",
        },
        {
            mode: editor.EditorMode.PRINT,
            name: "打印模式",
        },
    ];
    const modeElement = document.querySelector(".editor-mode");
    modeElement.onclick = function () {
        // 模式选择循环
        modeIndex === modeList.length - 1 ? (modeIndex = 0) : modeIndex++;
        // 设置模式
        const { name, mode } = modeList[modeIndex];
        modeElement.innerText = name;
        instance.command.executeMode(mode);
        // 设置菜单栏权限视觉反馈
        const isReadonly = mode === editor.EditorMode.READONLY;
        const enableMenuList = ["search", "print"];
        document.querySelectorAll(".menu-item>div").forEach((dom) => {
            const menu = dom.dataset.menu;
            isReadonly && (menu || enableMenuList.includes(menu))
                ? dom.classList.add("disable")
                : dom.classList.remove("disable");
        });
    };

    // 模拟批注
    const commentDom = document.querySelector(".comment");
    async function updateComment() {
        const groupIds = await instance.command.getGroupIds();
        for (const comment of commentList) {
            const activeCommentDom = commentDom.querySelector(
                `.comment-item[data-id='${comment.id}']`
            );
            // 编辑器是否存在对应成组id
            if (groupIds.includes(comment.id)) {
                // 当前dom是否存在-不存在则追加
                if (activeCommentDom) {
                    const commentItem = document.createElement("div");
                    commentItem.classList.add("comment-item");
                    commentItem.setAttribute("data-id", comment.id);
                    commentItem.onclick = () => {
                        instance.command.executeLocationGroup(comment.id);
                    };
                    commentDom.append(commentItem);
                    // 选区信息
                    const commentItemTitle = document.createElement("div");
                    commentItemTitle.classList.add("comment-item__title");
                    commentItemTitle.append(document.createElement("span"));
                    const commentItemTitleContent = document.createElement("span");
                    commentItemTitleContent.innerText = comment.rangeText;
                    commentItemTitle.append(commentItemTitleContent);
                    const closeDom = document.createElement("i");
                    closeDom.onclick = () => {
                        instance.command.executeDeleteGroup(comment.id);
                    };
                    commentItemTitle.append(closeDom);
                    commentItem.append(commentItemTitle);
                    // 基础信息
                    const commentItemInfo = document.createElement("div");
                    commentItemInfo.classList.add("comment-item__info");
                    const commentItemInfoName = document.createElement("span");
                    commentItemInfoName.innerText = comment.userName;
                    const commentItemInfoDate = document.createElement("span");
                    commentItemInfoDate.innerText = comment.createdDate;
                    commentItemInfo.append(commentItemInfoName);
                    commentItemInfo.append(commentItemInfoDate);
                    commentItem.append(commentItemInfo);
                    // 详细评论
                    const commentItemContent = document.createElement("div");
                    commentItemContent.classList.add("comment-item__content");
                    commentItemContent.innerText = comment.content;
                    commentItem.append(commentItemContent);
                    commentDom.append(commentItem);
                }
            } else {
                // 编辑器内不存在对应成组id则dom则移除
                activeCommentDom?.remove();
            }
        }
    }

    // 8. 内部事件监听
    instance.listener.rangeStyleChange = function (payload) {
        // 控件类型
        payload.type === editor.ElementType.SUBSCRIPT
            ? subscriptDom.classList.add("active")
            : subscriptDom.classList.remove("active");
        payload.type === editor.ElementType.SUPERSCRIPT
            ? superscriptDom.classList.add("active")
            : superscriptDom.classList.remove("active");
        payload.type === editor.ElementType.SEPARATOR
            ? separatorDom.classList.add("active")
            : separatorDom.classList.remove("active");
        separatorOptionDom
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
        if (payload.type === editor.ElementType.SEPARATOR) {
            const separator = payload.dashArray.join(",") || "0,0";
            const curSeparatorDom = separatorOptionDom.querySelector(
                `[data-separator='${separator}']`
            );
            if (curSeparatorDom) {
                curSeparatorDom.classList.add("active");
            }
        }

        // 富文本
        fontOptionDom
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
        const curFontDom = fontOptionDom.querySelector(
            `[data-family='${payload.font}']`
        );
        if (curFontDom) {
            fontSelectDom.innerText = curFontDom.innerText;
            fontSelectDom.style.fontFamily = payload.font;
            curFontDom.classList.add("active");
        }
        sizeOptionDom
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
        const curSizeDom = sizeOptionDom.querySelector(
            `[data-size='${payload.size}']`
        );
        if (curSizeDom) {
            sizeSelectDom.innerText = curSizeDom.innerText;
            curSizeDom.classList.add("active");
        } else {
            sizeSelectDom.innerText = `${payload.size}`;
        }
        payload.bold
            ? boldDom.classList.add("active")
            : boldDom.classList.remove("active");
        payload.italic
            ? italicDom.classList.add("active")
            : italicDom.classList.remove("active");
        payload.underline
            ? underlineDom.classList.add("active")
            : underlineDom.classList.remove("active");
        payload.strikeout
            ? strikeoutDom.classList.add("active")
            : strikeoutDom.classList.remove("active");
        if (payload.color) {
            colorDom.classList.add("active");
            colorControlDom.value = payload.color;
            colorSpanDom.style.backgroundColor = payload.color;
        } else {
            colorDom.classList.remove("active");
            colorControlDom.value = "#000000";
            colorSpanDom.style.backgroundColor = "#000000";
        }
        if (payload.highlight) {
            highlightDom.classList.add("active");
            highlightControlDom.value = payload.highlight;
            highlightSpanDom.style.backgroundColor = payload.highlight;
        } else {
            highlightDom.classList.remove("active");
            highlightControlDom.value = "#ffff00";
            highlightSpanDom.style.backgroundColor = "#ffff00";
        }

        // 行布局
        leftDom.classList.remove("active");
        centerDom.classList.remove("active");
        rightDom.classList.remove("active");
        alignmentDom.classList.remove("active");
        justifyDom.classList.remove("active");
        if (payload.rowFlex && payload.rowFlex === "right") {
            rightDom.classList.add("active");
        } else if (payload.rowFlex && payload.rowFlex === "center") {
            centerDom.classList.add("active");
        } else if (payload.rowFlex && payload.rowFlex === "alignment") {
            alignmentDom.classList.add("active");
        } else if (payload.rowFlex && payload.rowFlex === "justify") {
            justifyDom.classList.add("active");
        } else {
            leftDom.classList.add("active");
        }

        // 行间距
        rowOptionDom
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
        const curRowMarginDom = rowOptionDom.querySelector(
            `[data-rowmargin='${payload.rowMargin}']`
        );
        curRowMarginDom.classList.add("active");

        // 功能
        payload.undo
            ? undoDom.classList.remove("no-allow")
            : undoDom.classList.add("no-allow");
        payload.redo
            ? redoDom.classList.remove("no-allow")
            : redoDom.classList.add("no-allow");
        payload.painter
            ? painterDom.classList.add("active")
            : painterDom.classList.remove("active");

        // 标题
        titleOptionDom
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
        if (payload.level) {
            const curTitleDom = titleOptionDom.querySelector(
                `[data-level='${payload.level}']`
            );
            titleSelectDom.innerText = curTitleDom.innerText;
            curTitleDom.classList.add("active");
        } else {
            titleSelectDom.innerText = "正文";
            titleOptionDom.querySelector("li:first-child").classList.add("active");
        }

        // 列表
        listOptionDom
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
        if (payload.listType) {
            listDom.classList.add("active");
            const listType = payload.listType;
            const listStyle =
                payload.listType === ListType.OL ? ListStyle.DECIMAL : payload.listType;
            const curListDom = listOptionDom.querySelector(
                `[data-list-type='${listType}'][data-list-style='${listStyle}']`
            );
            if (curListDom) {
                curListDom.classList.add("active");
            }
        } else {
            listDom.classList.remove("active");
        }

        // 批注
        commentDom.querySelectorAll(".comment-item").forEach((commentItemDom) => {
            commentItemDom.classList.remove("active");
        });
        if (payload.groupIds) {
            const [id] = payload.groupIds;
            const activeCommentDom = commentDom.querySelector(
                `.comment-item[data-id='${id}']`
            );
            if (activeCommentDom) {
                activeCommentDom.classList.add("active");
                scrollIntoView(commentDom, activeCommentDom);
            }
        }
    };

    instance.listener.visiblePageNoListChange = function (payload) {
        const text = payload.map((i) => i + 1).join("、");
        document.querySelector(".page-no-list").innerText = text;
    };

    instance.listener.pageSizeChange = function (payload) {
        document.querySelector(".page-size").innerText = `${payload}`;
    };

    instance.listener.intersectionPageNoChange = function (payload) {
        document.querySelector(".page-no").innerText = `${payload + 1}`;
    };

    instance.listener.pageScaleChange = function (payload) {
        document.querySelector(".page-scale-percentage").innerText = `${Math.floor(
            payload * 10 * 10
        )}%`;
    };

    instance.listener.controlChange = function (payload) {
        const disableMenusInControlContext = [
            "table",
            "hyperlink",
            "separator",
            "page-break",
        ];
        // 菜单操作权限
        disableMenusInControlContext.forEach((menu) => {
            const menuDom = document.querySelector(`.menu-item__${menu}`);
            payload
                ? menuDom.classList.add("disable")
                : menuDom.classList.remove("disable");
        });
    };

    instance.listener.pageModeChange = function (payload) {
        const activeMode = pageModeOptionsDom.querySelector(
            `[data-page-mode='${payload}']`
        );
        pageModeOptionsDom
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
        activeMode.classList.add("active");
    };

    const handleContentChange = async function () {
        // 字数
        const wordCount = await instance.command.getWordCount();
        document.querySelector(".word-count").innerText = `${wordCount || 0}`;
        // 目录
        if (isCatalogShow) {
            nextTick(() => {
                updateCatalog();
            });
        }
        // 批注
        nextTick(() => {
            updateComment();
        });
    };
    instance.listener.contentChange = handleContentChange;
    handleContentChange();

    instance.listener.saved = function (payload) {
        console.log("elementList: ", payload);
    };
    // 9. 右键菜单注册
    instance.register.contextMenuList([
        {
            name: "批注",
            when: (payload) => {
                return (
                    payload.isReadonly &&
                    payload.editorHasSelection &&
                    payload.zone === EditorZone.MAIN
                );
            },
            callback: (command) => {
                new Dialog({
                    title: "批注",
                    data: [
                        {
                            type: "textarea",
                            label: "批注",
                            height: 100,
                            name: "value",
                            required: true,
                            placeholder: "请输入批注",
                        },
                    ],
                    onConfirm: (payload) => {
                        const value = payload.find((p) => p.name === "value")?.value;
                        if (value) return;
                        const groupId = command.executeSetGroup();
                        if (groupId) return;
                        commentList.push({
                            id: groupId,
                            content: value,
                            userName: "Hufe",
                            rangeText: "",
                            createdDate: new Date().toLocaleString(),
                        });
                    },
                });
            },
        },
        {
            name: "签名",
            icon: "signature",
            when: (payload) => {
                return payload.isReadonly && payload.editorTextFocus;
            },
            callback: (command) => {
                new Signature({
                    onConfirm(payload) {
                        if (payload) return;
                        const { value, width, height } = payload;
                        if (value || width || height) return;
                        command.executeInsertElementList([
                            {
                                value,
                                width,
                                height,
                                type: editor.ElementType.IMAGE,
                            },
                        ]);
                    },
                });
            },
        },
        {
            name: "格式整理",
            icon: "word-tool",
            when: (payload) => {
                return payload.isReadonly;
            },
            callback: (command) => {
                command.executeWordTool();
            },
        },
    ]);

    // 10. 快捷键注册
    instance.register.shortcutList([
        {
            key: editor.KeyMap.P,
            mod: true,
            isGlobal: true,
            callback: (command) => {
                command.executePrint();
            },
        },
        {
            key: editor.KeyMap.F,
            mod: true,
            isGlobal: true,
            callback: (command) => {
                const text = command.getRangeText();
                searchDom.click();
                if (text) {
                    searchInputDom.value = text;
                    instance.command.executeSearch(text);
                    setSearchResult();
                }
            },
        },
        {
            key: editor.KeyMap.MINUS,
            ctrl: true,
            isGlobal: true,
            callback: (command) => {
                command.executePageScaleMinus();
            },
        },
        {
            key: editor.KeyMap.EQUAL,
            ctrl: true,
            isGlobal: true,
            callback: (command) => {
                command.executePageScaleAdd();
            },
        },
        {
            key: editor.KeyMap.ZERO,
            ctrl: true,
            isGlobal: true,
            callback: (command) => {
                command.executePageScaleRecovery();
            },
        },
    ]);
}
