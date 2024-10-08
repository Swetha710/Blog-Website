import React from 'react'
import {format} from 'date-fns'
import {Link} from 'react-router-dom';

function Post({_id,title,summary,createdAt,cover,content}) {
  return (
    <div className="post">
          <div className="image">
            <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover}></img>
            </Link>
          </div>
          <div className="texts">
            <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
            </Link>
            <p className="info">
              <a className="author">Swetha Vijayakumar</a>
              <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
            </p>
            <p className="summary">{summary}</p>
          </div>
        </div>
  )
}

export default Post