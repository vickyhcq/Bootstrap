// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 坐标
/// </summary>
public struct MapPoint
{
    /// <summary>
    /// 默认构造
    /// </summary>
    public MapPoint()
    {
        X = 0;
        Y = 0;
    }

    /// <summary>
    /// 默认值构造
    /// </summary>
    /// <param name="x"></param>
    /// <param name="y"></param>
    public MapPoint(double x, double y)
    {
        X = x;
        Y = y;
    }

    /// <summary>
    /// X轴坐标
    /// </summary>
    public double X { get; set; }

    /// <summary>
    /// Y轴坐标
    /// </summary>
    public double Y { get; set; }
}
