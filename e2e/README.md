omega 项目设备管理前端自动化测试用例覆盖度

用例执行过程中可能存在的问题：

1. 如果并行（--workers 大于 1 ）执行一个文件，官方文档说是按声明顺序执行的，但可能会先执行后面的，比如先执行删除，再执行创建，导致用例失败。所以最好使用 npx playwright
   test --workers 1 命令执行。弊端是执行时间增加。
2. 雷达的序列号 ladarnSnVal 是生成随机数，但是输入序列号查询时会重新生成一个随机数，导致查不到雷达，用例失败。解决办法是让 ladarnSnVal
   成为一个固定值。暂时先把问题记录在这，用例在 e2e/pages/device/Ladar.spec.ts
3. 无头模式运行，从测试报告录制的视频中看，输入关键词点击查询，列表无变化。但手动测试，查询功能是好的。使用有头模式运行，无法复现 bug。尝试在点击查询按钮后休息 500 毫秒。
4. 无头模式运行，maintenance/Log.spec.ts, 编辑日志用例有时候不成功。提示需要选择 RSU ，但不需要选择 RSU
   才对。多跑几遍用例能通过，不清楚问题如何复现，暂时记录在此。

# 1. 设备管理

## 1.1. 操作 RSU 设备

- [新增 RSU 设备](./pages/device/Rsu.spec.ts)
- [编辑 RSU 设备](./pages/device/Rsu.spec.ts)
- [启用 RSU 设备](./pages/device/Rsu.spec.ts)
- [查看 RSU 设备详情信息](./pages/device/Rsu.spec.ts)
- [删除 RSU 设备](./pages/device/Rsu.spec.ts)
- 重启 RSU 设备 暂无用例

## 1.2 操作路侧毫米波雷达设备

- [新增雷达设备](./pages/device/Ladar.spec.ts)
- [编辑雷达设备](./pages/device/Ladar.spec.ts)
- [查看雷达设备详情信息](./pages/device/Ladar.spec.ts)
- [删除雷达设备](./pages/device/Ladar.spec.ts)

## 1.3. 操作路侧摄像头

- [新增摄像头设备](./pages/device/Camera.spec.ts)
- [编辑摄像头设备](./pages/device/Camera.spec.ts)
- [查看摄像头设备详情信息](./pages/device/Camera.spec.ts)
- [删除摄像头设备](./pages/device/Camera.spec.ts)

## 1.4. 操作路侧激光雷达设备

- [新增激光雷达设备](./pages/device/Lidar.spec.ts)
- [编辑激光雷达设备](./pages/device/Lidar.spec.ts)
- [查看激光雷达设备详情信息](./pages/device/Lidar.spec.ts)
- [启用激光雷达设备](./pages/device/Lidar.spec.ts)
- [删除激光雷达设备](./pages/device/Lidar.spec.ts)

## 1.5. 操作路侧信号灯设备

- [新增信号灯设备](./pages/device/Spat.spec.ts)
- [编辑信号灯设备](./pages/device/Spat.spec.ts)
- [查看信号灯设备详情信息](./pages/device/Spat.spec.ts)
- [启用信号灯设备](./pages/device/Spat.spec.ts)
- [删除信号灯设备](./pages/device/Spat.spec.ts)

## 1.6. [RSU 信息上报](./pages/device/Rsu.spec.ts)

- 登录 OpenV2X 边缘云控平台（OpenV2X Edge Portal）
- 配置 RSE Simulator 建立监听
- RSE Simulator 发送数据
- 查看边缘云控平台 RSU 设备

## 1.7. RSU 心跳上报 暂无用例

- 登录 OpenV2X 边缘云控平台（OpenV2X Edge Portal）
- RSE Simulator 发送数据
- 查看 RSU 设备界面

# 2. 事件管理

## 2.1. 查看历史数据统计分析结果

- [查看 RSI 消息的历史数据](./pages/event/Rsi.spec.ts)
- [查看 RSM 消息的历史数据](./pages/event/Rsm.spec.ts)
- [查看交叉路口碰撞预警 (ICW) 消息的历史数据](./pages/event/Icw.spec.ts)
- [查看弱势交通参与者碰撞预警 (VRUCW) 消息的历史数据](./pages/event/Vrucw.spec.ts)
- [查看逆向超车预警 (DNPW) 消息的历史数据](./pages/event/Dnpw.spec.ts)
- [查看感知数据共享 (SDS) 消息的历史数据](./pages/event/Sds.spec.ts)
- [查看协作式变道 (CLC) 消息的历史数据](./pages/event/Clc.spec.ts)

## 2.2. RSM 上报云控中心

- [配置 RSE Simulator 建立监听](./pages/event/Rsm.spec.ts)
- [RSE Simulator 发送数据](./pages/event/Rsm.spec.ts)
- [查看 RSE Simulator 接收数据及 RSM 界面](./pages/event/Rsm.spec.ts)

## 2.3. RSM 下发 RSU

- [配置 RSE Simulator 建立监听](./pages/road_simulator/RsmDownToRsu.spec.ts)
- [RSE Simulator 发送数据](./pages/road_simulator/RsmDownToRsu.spec.ts)
- [查看 RSE Simulator 接收数据](./pages/road_simulator/RsmDownToRsu.spec.ts)

# 3.运维管理

## 3.1. 查询下发 RSU 设备指令

- [查询下发 RSU 设备指令](./pages/maintenance/Query.spec.ts)

## 3.2. 配置 RSU 设备日志上报地址

- [配置 RSE Simulator 监听](./pages/road_simulator/RsuLogUp.spec.ts)
- [配置 RSU 日志上报地址](./pages/road_simulator/RsuLogUp.spec.ts)
- [查看 RSE Simulator 监听消息](./pages/road_simulator/RsuLogUp.spec.ts)
- [RSU 日志上报地址的添加/编辑/删除](./pages/maintenance/Log.spec.ts)

## 3.3. 下发配置至 RSU 设备

- [配置 RSE Simulator 监听](./pages/road_simulator/RsumaintDown.spec.ts)
- [下发配置至 RSU 设备](./pages/road_simulator/RsumaintDown.spec.ts)
- [查看 RSE Simulator 监听消息](./pages/road_simulator/RsumaintDown.spec.ts)
- [RSU 运维配置的编辑/下发/复制](./pages/maintenance/Maintenance.spec.ts)

## 3.4. MAP 上报云控中心

- [配置 RSE Simulator 建立监听](./pages/road_simulator/RsuMapUp.spec.ts)
- [RSE Simulator 发送数据](./pages/road_simulator/RsuMapUp.spec.ts)
- [查看 RSE Simulator 接收数据及 MAP 配置界面](./pages/road_simulator/RsuMapUp.spec.ts)

## 3.5. [MAP 下发至 RSU](./pages/maintenance/Map.spec.ts)

- 配置 RSE Simulator 建立监听
- 界面添加 Map 并下发 RSU
- 查看 RSE Simulator 接收数据
- RSE Simulator 发送应答数据
- 查看下发状态

## 3.6. RSI 上报云控中心

- [配置 RSE Simulator 建立监听](./pages/event/Rsi.spec.ts)
- [RSE Simulator 发送数据](./pages/event/Rsi.spec.ts)
- [查看 RSE Simulator 接收数据及路侧单元信息（RSI）界面](./pages/event/Rsi.spec.ts)

## 3.7. RSI 下发至 RSU

- [配置 RSE Simulator 建立监听](./pages/road_simulator/RsuRsiDown.spec.ts)
- [RSE Simulator 发送数据](./pages/road_simulator/RsuRsiDown.spec.ts)
- [查看 RSE Simulator 接收数据](./pages/road_simulator/RsuRsiDown.spec.ts)

## 3.8. RSU 业务配置下发

- [配置 RSE Simulator 建立监听](./pages/maintenance/Business.spec.ts)
- [RSU 业务配置](./pages/maintenance/Business.spec.ts)
- [RSE Simulator 接收数据](./pages/maintenance/Business.spec.ts)
- [RSE Simulator 发送应答数据](./pages/maintenance/Business.spec.ts)
- [查看下发状态](./pages/maintenance/Business.spec.ts)

## 3.9. [路口管理](./pages/maintenance/crossing.spec.ts)

- 创建路口
- 创建同编号的路口
- 对路口名和路口编号进行校验,错误输入无法提交
- 通过路口名称查询
- 通过安装区域查询
- 编辑路口
- 删除路口

## 3.10. [算法配置与算法版本](./pages/maintenance/algorithm.spec.ts)

- 创建算法版本
- 创建同名算法版本
- 通过算法版本查询
- 编辑算法配置
- 无法删除正在使用中的算法版本
- 成功删除算法版本

# 4. 系统配置

## 4.1 添加边缘站点

- [添加边缘站点](./pages/system_site.spec.ts)
