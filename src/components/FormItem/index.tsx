import { FormGroupType } from '#/typings/pro-component';
import { ProForm } from '@ant-design/pro-form';
import FormField from '../FormField';
import React from 'react';

const FormItem: React.FC<{ items: FormGroupType[] }> = ({ items }) => (
  <>
    {items.map(({ key, title, children, components, hidden }) =>
      hidden ? null : (
        <ProForm.Group key={key} title={title}>
          {children?.map(({ components: comp, hidden: hid, ...item }) =>
            hid ? null : (
              <div className={`antd-form-item-${item.name}`} key={item.name}>
                {comp || <FormField items={[item]} />}
              </div>
            ),
          )}
          {components}
        </ProForm.Group>
      ),
    )}
  </>
);

export default FormItem;
