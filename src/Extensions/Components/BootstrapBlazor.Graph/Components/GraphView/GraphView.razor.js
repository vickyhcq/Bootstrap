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
        ports: {
            groups: {
                in: {
                    position: 'top',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                },
                out: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                },
            },
            items: [
                {
                    id: 'port1',
                    group: 'in',
                },
                {
                    id: 'port2',
                    group: 'in',
                },
                {
                    id: 'port3',
                    group: 'in',
                },
                {
                    id: 'port4',
                    group: 'out',
                },
                {
                    id: 'port5',
                    group: 'out',
                },
            ],
        },
    })

    const c = new X6.Shape.Circle({
        width: 60,
        height: 60,
        attrs: {
            circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
            text: { text: 'ellipse', fill: 'white' },
        },
    })

    const c2 = new X6.Shape.Circle({
        width: 60,
        height: 60,
        attrs: {
            circle: { fill: '#4B4A67', 'stroke-width': 6, stroke: '#FE854F' },
            text: { text: 'ellipse', fill: 'white' },
        },
    })

    const r2 = new X6.Shape.Rect({
        width: 70,
        height: 40,
        attrs: {
            rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
            text: { text: 'rect', fill: 'white' },
        },
    })

    const r3 = new X6.Shape.Rect({
        width: 70,
        height: 40,
        attrs: {
            rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
            text: { text: 'rect', fill: 'white' },
        },
    })

    const c3 = new X6.Shape.Circle({
        width: 60,
        height: 60,
        attrs: {
            circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
            text: { text: 'ellipse', fill: 'white' },
        },
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

