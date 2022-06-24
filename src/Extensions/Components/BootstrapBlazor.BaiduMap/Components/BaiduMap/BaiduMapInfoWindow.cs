// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 弹窗内容
/// </summary>
public class BaiduMapInfoWindow
{
    /// <summary>
    /// 窗口大小
    /// </summary>
    public MapSize Size { get; set; }

    /// <summary>
    /// 窗口标题
    /// </summary>
    public string? Title { get; set; }

    /// <summary>
    /// 窗口内容
    /// </summary>
    public string? Content { get; set; }

}
