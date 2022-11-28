import { message, Modal } from 'antd';
import type { ActionType } from '@ant-design/pro-table';

type ConfirmModalParams = {
  id: number;
  content: string; // modal 提示内容
  modalFn: (id: number, params?: any) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  title?: string; // modal 标题
  successMsg?: string; // modal 操作成功的提示信息
  params?: number | Record<string, string | boolean | number>; // 额外参数
};
export const confirmModal = async ({
  id,
  params,
  title = t('Delete'),
  content,
  successMsg = t('{{value}} successfully', { value: t('Deleted') }),
  modalFn,
  actionRef,
}: ConfirmModalParams) => {
  Modal.confirm({
    title,
    content,
    cancelButtonProps: { id: 'cancelButton' },
    okButtonProps: { id: 'okButton' },
    okText: t('Sure'),
    cancelText: t('Cancel'),
    onOk() {
      return new Promise(async resolve => {
        try {
          await modalFn(id, params);
          resolve(true);
          message.success(successMsg);
          actionRef.current?.reload?.();
        } catch {
          resolve(false);
        }
      });
    },
  });
};
