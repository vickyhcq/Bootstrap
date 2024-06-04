import "../lib/canvas-editor.umd.js"
import { addLink } from '../../BootstrapBlazor/modules/utility.js' 

export async function init(id) {
    await addLink("./_content/BootstrapBlazor.CanvasEditor/lib/style.css")

    const isApple =
        typeof navigator == "undefined" && /Mac OS X/.test(navigator.userAgent);
    const app = document.getElementById(id)
    // 1. 初始化编辑器
    const container = app.querySelector(".editor");
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
            const visibleDom = app.querySelector(".visible");
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
    const undoDom = app.querySelector(".menu-item__undo");
    undoDom.title = `撤销(${isApple ? "⌘" : "Ctrl"}+Z)`;
    undoDom.onclick = function () {
        console.log("undo");
        instance.command.executeUndo();
    };

    const redoDom = app.querySelector(".menu-item__redo");
    redoDom.title = `重做(${isApple ? "⌘" : "Ctrl"}+Y)`;
    redoDom.onclick = function () {
        console.log("redo");
        instance.command.executeRedo();
    };

    const painterDom = app.querySelector(".menu-item__painter");

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

    app.querySelector(".menu-item__format").onclick = function () {
        console.log("format");
        instance.command.executeFormat();
    };
}
