export function bb_baidu_map(el, value, method, obj) {

    if (method === "init"){
        console.log(value)
        LoadBaiduMapScript(value.mapUrl).then((BMapGL) => {
            console.log(BMapGL);
            var map = new BMapGL.Map(value.id);
            map.centerAndZoom(new BMapGL.Point(value.x, value.y), value.zoom); // 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom(value.enableScrollWheelZoom); // 开启鼠标滚轮缩放
        })
    }

}

function LoadBaiduMapScript(url) {
    //console.log("初始化百度地图脚本...");
    const BMap_URL = url + "&callback=onBMapCallback";
    return new Promise((resolve, reject) => {
        // 如果已加载直接返回
        if(typeof BMapGL !== "undefined") {
            resolve(BMapGL);
            return true;
        }
        // 百度地图异步加载回调处理
        window.onBMapCallback = function () {
            console.log("百度地图脚本初始化成功...");
            resolve(BMapGL);
        };
        // 插入script脚本
        let scriptNode = document.createElement("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("src", BMap_URL);
        document.body.appendChild(scriptNode);
    });
}
