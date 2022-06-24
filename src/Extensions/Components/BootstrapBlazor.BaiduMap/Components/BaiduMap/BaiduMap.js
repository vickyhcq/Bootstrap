export function bb_baidu_map(el, value, method, obj) {

    if (method === "init"){
        LoadBaiduMapScript(value.mapUrl).then((BMapGL) => {
            var map = new BMapGL.Map(value.id);
            map.centerAndZoom(new BMapGL.Point(value.center.x, value.center.y), value.zoom); // 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom(value.enableScrollWheelZoom); // 开启鼠标滚轮缩放
            if (value.markers) {
                for (const marker of value.markers) {
                    var icon = {}
                    if(marker.icon) {
                        icon['icon'] = new BMapGL.Icon(marker.icon.url, new BMapGL.Size(marker.icon.size.width, marker.icon.size.height));
                    }
                    var point = new BMapGL.Point(marker.point.x, marker.point.y);
                    var mapMarker = new BMapGL.Marker(point, icon);
                    map.addOverlay(mapMarker);
                    if (marker.enableClick) {
                        mapMarker.addEventListener('click', function () {
                            obj.invokeMethodAsync('Click', marker.name);
                        });
                    }else if(marker.infoWindow) {
                        mapMarker.addEventListener('click', function () {
                            var infoWindow = new BMapGL.InfoWindow(marker.infoWindow.content, {
                                width: marker.infoWindow.size.width,
                                height: marker.infoWindow.size.height,
                                title: marker.infoWindow.title
                            });
                            map.openInfoWindow(infoWindow, point);
                        });
                    }
                }
            }
        })
    }

}

function LoadBaiduMapScript(url) {
    const BMap_URL = url + "&callback=onBMapCallback";
    return new Promise((resolve, reject) => {
        // 如果已加载直接返回
        if(typeof BMapGL !== "undefined") {
            resolve(BMapGL);
            return true;
        }
        // 百度地图异步加载回调处理
        window.onBMapCallback = function () {
            resolve(BMapGL);
        };
        // 插入script脚本
        let scriptNode = document.createElement("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("src", BMap_URL);
        document.body.appendChild(scriptNode);
    });
}
