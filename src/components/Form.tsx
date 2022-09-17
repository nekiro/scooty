import React, { Children, PropsWithChildren, ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';

type FormProps = {};

// TODO

export default function Form({ children }: PropsWithChildren<FormProps>) {
  return <View></View>
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     lastName: '',
  //   },
  // });

  // return (
  //   <View>
  //     {Children.map(
  //       Children.toArray(children) as ReactElement[],
  //       (child: ReactElement) => {
  //         child.props = { ...child.props };

  //         return (
  //           <Controller
  //             key="xd"
  //             control={control}
  //             render={({ field: { onChange, onBlur, value } }) =>
  //               React.cloneElement(child, {
  //                 onChangeText: onChange,
  //                 onBlur,
  //                 value,
  //               })
  //             }
  //             name={child.props.name}
  //           />
  //         );
  //       },
  //     )}
  //   </View>
  );
}
