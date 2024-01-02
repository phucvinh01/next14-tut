'use client';
import React, { useId, useState } from 'react';
import { Modal, message } from 'antd';
import { IoCreateOutline } from 'react-icons/io5';
import FileUploader from './FileUploader';
import { IoCloseOutline } from 'react-icons/io5';
import TextArea from 'antd/es/input/TextArea';
import { FileWithPath } from 'react-dropzone';
const ModalNewBlog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<FileWithPath[]>([]);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const id = useId();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      title === '' ||
      tag === '' ||
      location === '' ||
      caption === '' ||
      image.length === 0
    ) {
      message.error('Please fill out all fields');
      setLoading(false);
      return;
    }
    else {

      const blog = {
        title,
        tag,
        location,
        caption,
      }

      console.log(blog);
      try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blog
        }),
      });
      if (res.status === 400) {
        message.error("failed")
        setLoading(false);
      }
      if (res.status === 200) {
        message.success("success")
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
        message.error("failed")
      setLoading(false);
    }
    }
  
  };

  return (
    <>
      <button
        onClick={showModal}
        className='flex items-center gap-3   focus:ring-2, focus:ring-blue-500, focus:ring-opacity-50'>
        <IoCreateOutline />
        <p>New</p>
      </button>
      <Modal
        width={600}
        className='relative'
        footer={null}
        open={isModalOpen}
        closeIcon={null}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className='flex justify-end absolute right-[-20px] top-[-25px]'>
          <button
            className='btn-primary-rounded'
            onClick={handleCancel}>
            {' '}
            <span className='text-xl'>
              <IoCloseOutline />
            </span>
          </button>
        </div>
        <form className='flex gap-4 '>
          <div className='flex justify-center items-center p-4 border-2 rounded-md min-w-[45%]'>
            <FileUploader onChange={setImage} />
          </div>
          <div className='w-full p-4 flex gap-5 flex-col'>
            <div className='flex gap-2 flex-col justify-center'>
              <label htmlFor={id + 'title'}>Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type='text'
                id={id + 'title'}
                max={2200}
                className='focus:border-[#333] px-3 py-1 w-full border-b-[2px] outline-none rounded-sm'
              />
            </div>
            <div className='flex gap-2 flex-col justify-center'>
              <label htmlFor={id + 'caption'}>Caption</label>
              <TextArea
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                autoSize
                maxLength={2200}
                showCount
                id={id + 'caption'}
                className='h-[[220px] focus:!border-[#333] px-3 py-1 w-full !border-b-[2px] !outline-0 hover:!border-[#333]  focus-within:!outline-0  rounded-sm'
              />
            </div>
            <div className='flex gap-2 flex-col justify-center'>
              <label htmlFor={id + 'Tag'}>Tag</label>
              <input
                onChange={(e) => setTag(e.target.value)}
                value={tag}
                type='text'
                id={id + 'Tag'}
                max={2200}
                className='focus:border-[#333] px-3 py-1 w-full border-b-[2px] outline-none rounded-sm'
              />
            </div>
            <div className='flex gap-2 flex-col justify-center'>
              <label htmlFor={id + 'Location'}>Location</label>
              <input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                type='text'
                id={id + 'Location'}
                max={2200}
                className='focus:border-[#333] px-3 py-1 w-full border-b-[2px] outline-none rounded-sm'
              />
            </div>
          </div>
        </form>
        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            type='submit'
            disabled={loading}
            className='btn-primary'>
            {loading ? 'Creating...' : 'Create'}{' '}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalNewBlog;
