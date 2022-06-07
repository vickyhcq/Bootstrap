// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

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
}
