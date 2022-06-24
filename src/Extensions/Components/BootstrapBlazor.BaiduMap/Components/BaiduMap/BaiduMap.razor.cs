// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Components;

/// <summary>
/// 百度地图基础类
/// </summary>
public partial class BaiduMap
{
    /// <summary>
    /// 百度地图的Key，需自行申请
    /// </summary>
    [Parameter]
    [NotNull]
    public string? Ak { get; set; }

    /// <summary>
    /// 中心点位置
    /// </summary>
    [Parameter]
    public MapPoint? Center { get; set; }

    /// <summary>
    /// 缩放级别
    /// </summary>
    [Parameter]
    public int? Zoom { get; set; }

    /// <summary>
    /// 是否开启滚轮缩放，默认为true
    /// </summary>
    [Parameter]
    public bool? EnableScrollWheelZoom { get; set; } = true;

    /// <summary>
    /// 覆盖物列表
    /// </summary>
    [Parameter]
    public List<BaiduMarker>? Markers { get; set; }

    /// <summary>
    /// 获得/设置 覆盖物点击事件
    /// </summary>
    [Parameter]
    public EventCallback<string> MarkerClick { get; set; }

    private BaiduMapOption Option { get; set; } = new BaiduMapOption();

    [NotNull]
    private JSModule<BaiduMap>? Module { get; set; }

    /// <summary>
    /// 获得/设置 DOM 元素实例
    /// </summary>
    private ElementReference MapElement { get; set; }

    /// <summary>
    ///
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();
        Option.Center = Center;
        Option.Zoom = Zoom;
        Option.MapUrl = $"//api.map.baidu.com/api?type=webgl&v=1.0&ak={Ak}";
        Option.Id = Id;
        Option.EnableScrollWheelZoom = EnableScrollWheelZoom;
        Option.Markers = Markers;
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="firstRender"></param>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (firstRender)
        {
            Module = await JSRuntime.LoadModule<BaiduMap>("./_content/BootstrapBlazor.BaiduMap/js/bootstrap.blazor.baidumap.min.js", this, false);
            await Module.InvokeVoidAsync("bb_baidu_map", MapElement, Option, "init");
        }
    }

    /// <summary>
    /// 覆盖物点击事件回调
    /// </summary>
    /// <param name="markerName"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task Click(string markerName)
    {
        if (MarkerClick.HasDelegate)
        {
            await MarkerClick.InvokeAsync(markerName);
        }
    }
}
