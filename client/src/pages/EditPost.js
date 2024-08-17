import React, {useEffect, useState} from 'react'
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [content,setContent] = useState('')
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    fetch('http://localhost:4000/post/'+id)
    .then(res => {
        res.json().then(postInfo =>{
            setTitle(postInfo.title)
            setContent(postInfo.content)
            setSummary(postInfo.summary)
        })
    })
  })

  async function updatePost(ev){
    ev.preventDefault()
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id',id)
    if (files?.[0]){
        data.set('file', files?.[0])
    }
    const res = await fetch('http://localhost:4000/post', {
        method:'PUT',
        body:data,
        credentials:'include'
    })
    if(res.ok){
        setRedirect(true)
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }
  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <ReactQuill
      value={content}
      theme={'snow'}
      onChange={newval => setContent(newval)}
      modules={modules} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}

export default EditPost