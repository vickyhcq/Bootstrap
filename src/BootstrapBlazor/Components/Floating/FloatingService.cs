// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <see cref="Floating"/> 服务类
/// </summary>
public class FloatingService : BootstrapServiceBase<FloatingOption>
{
    /// <summary>
    /// 显示方法
    /// </summary>
    /// <param name="option">浮动内容配置</param>
    /// <param name="provider">指定浮动组件 默认为 null 使用 <see cref="BootstrapBlazorRoot"/> 组件内置浮动容器组件</param>
    /// <returns></returns>
    public Task Show(FloatingOption option, FloatingProvider? provider = null) => Invoke(option, provider);

    /// <summary>
    /// 清除方法
    /// </summary>
    /// <param name="provider">指定浮动组件 默认为 null 使用 <see cref="BootstrapBlazorRoot"/> 组件内置浮动容器组件</param>
    /// <returns></returns>
    public Task Clear(FloatingProvider? provider = null) => Invoke(new(), provider);
}
