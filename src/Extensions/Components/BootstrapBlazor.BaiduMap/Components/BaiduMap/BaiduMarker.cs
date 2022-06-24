// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 基本标记物
/// </summary>
public class BaiduMarker
{

    /// <summary>
    /// 标记点名称，回调使用
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// 标记点位置
    /// </summary>
    public MapPoint? Point { get; set; }

    /// <summary>
    /// 图标，为空则不显示
    /// </summary>
    public BaiduMapIcon? Icon { get; set; }

    /// <summary>
    /// 是否启用点击回调，启用则不能弹窗
    /// </summary>
    public bool EnableClick { get; set; }

    /// <summary>
    /// 信息弹窗，当启用回调时无效
    /// </summary>
    public BaiduMapInfoWindow? InfoWindow { get; set; }
}
