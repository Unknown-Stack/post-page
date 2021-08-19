import React from "react";
import PostListItem from '../post-list-item';
import {ListGroup} from "react-bootstrap";

import './post-list.css';

const PostList = ({posts, onDelete, onToggledLike, onToggleImportant}) => {
    const elements = posts.map((item)=>{
        return (
            <li  key={item.id} className='list-group-item'>
                <PostListItem label={item.label} like={item.like} important={item.important} onDelete={()=> onDelete(item.id)}
                onToggleImportant={() => onToggleImportant(item.id)}
                onToggledLike={()=> onToggledLike(item.id)}/>
            </li>
        )
    });
    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;