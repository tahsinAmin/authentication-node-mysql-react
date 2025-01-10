import React, {useEffect} from 'react'
import {Layout} from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import { FormEditTicket } from '../components/FormEditTicket';
import { FormControlTicket } from '../components/FormControlTicket';

export const EditTicket = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state => state.auth));
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      {user && user.role === "admin" ? (
        <FormControlTicket/>
      ): (<FormEditTicket/>) }
    </Layout>
  )
}