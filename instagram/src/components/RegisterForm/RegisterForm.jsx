import React from 'react';
import { Form, useField, Formik } from 'formik';
import { TextInput } from '../TextInput/TextInput';
import { validationSchemaRegister } from '../../helpers/validationSchema';

import { useMutation } from '@apollo/client';
import { REGISTER } from '../../gql/user';

export const RegisterForm = ({ loginForm, setLoginForm }) => {
  const [register] = useMutation(REGISTER);
  return (
    <Formik
      initialValues={{
        name: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
      }}
      validationSchema={validationSchemaRegister}
      onSubmit={async (values) => {
        try {
          const newUser = values;
          delete newUser.repeatPassword;
          await register({
            variables: {
              input: newUser,
            },
          });

          setLoginForm(true);
        } catch (error) {
          console.log('error', error);
        }
      }}
    >
      {(formik) => (
        <Form
          onSubmit={formik.handleSubmit}
          className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
        >
          <div className="pb-2 pt-2">
            <TextInput
              useField={useField}
              type="text"
              name="name"
              label="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="pb-2 pt-2">
            <TextInput
              useField={useField}
              type="text"
              name="username"
              label="Nombre de usuario"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>
          <div className="pb-2 pt-2">
            <TextInput
              useField={useField}
              type="email"
              name="email"
              label="Correo electronico"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="pb-2 pt-2">
            <TextInput
              useField={useField}
              label="Contrase??a"
              name="password"
              type="password"
              autoComplete="on"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="pb-2 pt-2">
            <TextInput
              useField={useField}
              label="Repetir contrase??a"
              name="repeatPassword"
              type="password"
              autoComplete="on"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
            />
          </div>
          <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
            <a href="#" className="text-sm">
              Olvidaste tu constrase??a?
            </a>
          </div>
          <div type="submit" className="relative inline-flex group w-full mt-5">
            <div
              className={
                formik.isValid && formik.dirty
                  ? 'absolute transitiona-all duration-1000 opacity-60 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter  group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200'
                  : 'absolute'
              }
            ></div>{' '}
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className={
                formik.isValid && formik.dirty
                  ? ' w-full relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer'
                  : '  w-full relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-md focus:outline-none  disabled:opacity-60 disabled:hover:bg-gray-900'
              }
            >
              Registrar
            </button>
          </div>
          <div className="flex mt-7 items-center text-center">
            {loginForm ? (
              <label className="block font-medium text-sm text-gray-400 w-full cursor-pointer hover:text-white">
                No tienes una cuenta?{' '}
                <a
                  href="#"
                  onClick={() => setLoginForm(!loginForm)}
                  className="hover:underline"
                >
                  Registrate
                </a>
              </label>
            ) : (
              <label className="block font-medium text-sm text-gray-400 w-full  cursor-pointer hover:text-white">
                Tienes una cuenta?{' '}
                <a
                  href="#"
                  onClick={() => setLoginForm(!loginForm)}
                  className="hover:underline"
                >
                  Inicia sesion
                </a>
              </label>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
