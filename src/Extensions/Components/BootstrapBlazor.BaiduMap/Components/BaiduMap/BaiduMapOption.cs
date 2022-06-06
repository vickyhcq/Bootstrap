// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 百度地图配置信息
/// </summary>
public class BaiduMapOption
{

    /// <summary>
    /// 组件Id
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// 地图Url
    /// </summary>
    public string? MapUrl { get; set; }

    /// <summary>
    /// 横坐标
    /// </summary>
    public double? X { get; set; }

    /// <summary>
    /// 纵坐标
    /// </summary>
    public double? Y { get; set; }

    /// <summary>
    /// 缩放比例
    /// </summary>
    public int? Zoom { get; set; }

    /// <summary>
    /// 是否开启滚轮缩放，默认为true
    /// </summary>
    public bool? EnableScrollWheelZoom { get; set; }
}
