import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { renderAreaFormatName } from '#/components/Country/renderHelper';
import ParameterInfo from '#/components/ParameterInfo';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deviceInfo, runningInfo } from '#/services/api/device/device';
import { ProCard } from '@ant-design/pro-components';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CPULineChart from './components/CPULineChart';
import DiskLineChart from './components/DiskLineChart';
import MemoryLineChart from './components/MemoryLineChart';
import NetworkLineChart from './components/NetworkLineChart';
import styles from './index.module.less';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Device.DeviceListItem | undefined }> = ({
  basicInfo = {},
}) => {
  const infoMap = [
    {
      key: 'rsuId',
      label: t('RSU ID'),
    },
    {
      key: 'rsuName',
      label: t('RSU Name'),
    },
    {
      key: 'rsuEsn',
      label: t('Serial Number'),
    },
    {
      key: 'rsuIP',
      label: t('RSU IP'),
    },
    {
      key: 'provinceName',
      label: t('Installation Area'),
      render: renderAreaFormatName,
    },
    {
      key: 'address',
      label: t('Specific Location'),
    },
    {
      key: 'rsuModelName',
      label: t('RSU Model'),
    },
    {
      key: 'createTime',
      label: t('Creation Time'),
    },
    {
      key: 'imei',
      label: t('IMEI'),
    },
    {
      key: 'iccID',
      label: t('Identification Code'),
    },
    {
      key: 'communicationType',
      label: t('Supported Communication Methods'),
    },
    {
      key: 'runningCommunicationType',
      label: t('Current Communication Method'),
    },
    {
      key: 'onlineStatus',
      label: t('Online Status'),
      render: ({ onlineStatus }: Device.DeviceListItem) =>
        DeviceOnlineStatusOptions[`${onlineStatus}`],
    },
    {
      key: 'enabled',
      label: t('Device Enabled'),
      render: ({ enabled }: Device.DeviceListItem) => DeviceStatusOptions[`${enabled}`],
    },
    {
      key: 'transprotocal',
      label: t('Server Type'),
    },
    {
      key: 'softwareVersion',
      label: t('Version'),
    },
    {
      key: 'hardwareVersion',
      label: t('Hardware Version'),
    },
    {
      key: 'depart',
      label: t('Organization'),
    },
    {
      key: 'lon',
      label: t('Longitude'),
    },
    {
      key: 'lat',
      label: t('Latitude'),
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
  ];

  const data = { ...basicInfo };
  if (data.location) {
    // @ts-ignore
    data.lon = data.location.lon;
    // @ts-ignore
    data.lat = data.location.lat;
  }

  return (
    <ProCard title={t('Basic Information')} className={styles.card}>
      <CardList infoMap={infoMap} info={data} xl={12} />
    </ProCard>
  );
};

// 运行信息
const RunningInfo: React.FC<{ runningData: Device.DeviceRunningInfo | undefined }> = ({
  runningData = {},
}) => {
  const infoMap = [
    {
      title: t('CPU Running Information'),
      children: <CPULineChart list={runningData.cpu || []} />,
    },
    {
      title: t('Memory Operation Information'),
      children: <MemoryLineChart list={runningData.mem || []} />,
    },
    {
      title: t('Disk Operation Information'),
      children: <DiskLineChart list={runningData.disk || []} />,
    },
    {
      title: t('Network Operation Information'),
      children: <NetworkLineChart list={runningData.net || []} />,
    },
  ];
  return (
    <ProCard
      title={t('Running Information')}
      className={classNames(styles['parameter-info'], styles.card)}
      gutter={[20, 20]}
      wrap
    >
      {infoMap.map(({ title, children }) => (
        <ProCard key={title} colSpan={12} bordered>
          <div className={styles['parameter-title']}>{title}</div>
          <div className={styles['parameter-chart']}>{children}</div>
        </ProCard>
      ))}
    </ProCard>
  );
};

const DeviceDetails: React.FC = () => {
  const params = useParams<{ label: string; [key: string]: string }>();

  const [data, setData] = useState<Device.DeviceListItem>();
  const [runningData, setRunningData] = useState<Device.DeviceRunningInfo>();
  const navigate = useNavigate();

  const fetchDeviceInfo = async () => {
    const result = await deviceInfo(+params.id);
    setData(result || undefined);
  };

  const fetchRunningInfo = async () => {
    const result = await runningInfo(+params.id);
    setRunningData(result || undefined);
  };

  useEffect(() => {
    if (!params.id) {
      navigate(-1);
    }

    fetchDeviceInfo();
    fetchRunningInfo();
  }, []);

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <RunningInfo runningData={runningData} />
      <ParameterInfo parameterInfo={data?.config?.[0]} />
    </BaseContainer>
  );
};

export default DeviceDetails;
