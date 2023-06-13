import "../../js/x6.js"
import "../../js/dnd.js"
import "../../js/stencil.js"
import { addLink } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'

export function init(id) {
    addLink("./_content/BootstrapBlazor.Graph/css/bootstrap-bb-graphview.css")
    const el = document.getElementById(id);
    const graph = new X6.Graph({
        container: el,
        width: 800,
        height: 600,
        panning: true,
        mousewheel: true,
        background: {
            color: '#F2F7FA',
        },
        grid: {
            visible: true,
            type: 'doubleMesh',
            args: [
                {
                    color: '#eee', // 主网格线颜色
                    thickness: 1, // 主网格线宽度
                },
                {
                    color: '#ddd', // 次网格线颜色
                    thickness: 1, // 次网格线宽度
                    factor: 4, // 主次网格线间隔
                },
            ],
        },
    })

    const dnd = new X6PluginDnd.Dnd({
        target: graph,
    });

    Data.set(id, { graph, dnd })

    console.log(X6)
    console.log(X6PluginDnd)
    console.log(X6PluginStencil)

    document.querySelector("[data-type]").addEventListener("mousedown", e => {
        const node = graph.createNode({
            shape: "rect",
            width: 100,
            height: 40,
            ports: {
                items: [
                    {
                        id: 'port_1',
                        group: 'bottom',
                    },
                    {
                        id: 'port_2',
                        group: 'bottom',
                    },
                ],
            },
        });
        dnd.start(node, e);
    })
}

export function addNode(id, type, args) {
    const data = Data.get(id);
    if (data) {
        const node = data.graph.createNode({
            shape: type,
            width: 100,
            height: 40,
        });
        data.dnd.start(node, args);
    };
}

