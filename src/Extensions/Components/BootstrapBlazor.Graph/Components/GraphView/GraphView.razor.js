import "../../js/x6.js"
import "../../js/dnd.js"
import "../../js/stencil.js"
import { addLink } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'

export function init(id) {
    addLink("./_content/BootstrapBlazor.Graph/css/bootstrap-bb-graphview.css")
    var graph = new X6.Graph({
        container: document.querySelector('.app-content'),
        grid: true,
        snapline: {
            enabled: true,
            sharp: true,
        },
        scroller: {
            enabled: true,
            pageVisible: false,
            pageBreak: false,
            pannable: true,
        },
    })

    graph.centerContent()

    graph.on('node:mouseenter', () => {
        const container = document.querySelector('.app-content')
        const ports = container.querySelectorAll(
            '.x6-port-body',
        )
        showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
        const container = document.querySelector('.app-content')
        const ports = container.querySelectorAll(
            '.x6-port-body',
        )
        showPorts(ports, false)
    })

    const stencil = new X6PluginStencil.Stencil({
        title: 'Components',
        target: graph,
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        groups: [
            {
                name: 'group1',
                title: 'Group(Collapsable)',
            },
            {
                name: 'group2',
                title: 'Group',
                collapsable: false,
            },
        ],
    })
    const stencilContainer = document.querySelector(".app-stencil");
    stencilContainer.appendChild(stencil.container)

    const r = new X6.Shape.Rect({
        width: 70,
        height: 40,
        attrs: {
            rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
            text: { text: 'rect', fill: 'white' },
        },
        ports: { ...ports },
    })

    const c = new X6.Shape.Circle({
        width: 60,
        height: 60,
        attrs: {
            circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
            text: { text: 'ellipse', fill: 'white' },
        },
        ports: { ...ports },
    })

    const c2 = new X6.Shape.Circle({
        width: 60,
        height: 60,
        attrs: {
            circle: { fill: '#4B4A67', 'stroke-width': 6, stroke: '#FE854F' },
            text: { text: 'ellipse', fill: 'white' },
        },
        ports: { ...ports },
    })

    const r2 = new X6.Shape.Rect({
        width: 70,
        height: 40,
        attrs: {
            rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
            text: { text: 'rect', fill: 'white' },
        },
        ports: { ...ports },
    })

    const r3 = new X6.Shape.Rect({
        width: 70,
        height: 40,
        attrs: {
            rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
            text: { text: 'rect', fill: 'white' },
        },
        ports: { ...ports },
    })

    const c3 = new X6.Shape.Circle({
        width: 60,
        height: 60,
        attrs: {
            circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
            text: { text: 'ellipse', fill: 'white' },
        },
        ports: { ...ports },
    })

    stencil.load([r, c, c2, r2.clone()], 'group1')
    stencil.load([c2.clone(), r2, r3, c3], 'group2')
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

const showPorts = (ports, show) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
}

const ports = {
    groups: {
        top: {
            position: 'top',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        right: {
            position: 'right',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        bottom: {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        left: {
            position: 'left',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
    },
    items: [
        {
            group: 'top',
        },
        {
            group: 'right',
        },
        {
            group: 'bottom',
        },
        {
            group: 'left',
        },
    ],
}

