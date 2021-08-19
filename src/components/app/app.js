import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
  max-width: 800px;
  margin: 2rem auto 0;
` ;

// const StyledAppBlock = styled(AppBlock)`
// background-color: #aeaeae;
// `;

export default class App extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn React', important: true, like:false, id: 1},
                {label: 'That is so good', important: true, like:true, id: 2},
                {label: 'I need a break', important: true, like:false, id: 3}
            ]
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggledLike = this.onToggledLike.bind(this);
        this.maxId = 4;
    }
    deleteItem(id) {
        this.setState(({data}) => {
             const index = data.findIndex(elem => elem.id === id);
             const before = data.slice(0, index);
             const after = data.slice(index+1);

             const newArr = [...before, ...after];

             return {
                 data: newArr
             }
        });
    }
    addItem(body) {
        const newItem = {
            label:body, important:false, id:this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }
    onToggleImportant(id){
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const oldPost = data[index];
            const newPost = {...oldPost, important:!oldPost.important};

            const newArr = [...data.slice(0,index), newPost, ...data.slice(index+1)];
            return {
                data:newArr
            }
        })
    }
    onToggledLike(id){
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const oldPost = data[index];
            const newPost = {...oldPost, like:!oldPost.like};

            const newArr = [...data.slice(0,index), newPost, ...data.slice(index+1)];
            return {
                data:newArr
            }
        })
    }
    render() {
        const {data} = this.state;
        const liked = data.filter(item=> item.like).length;
        const allPosts =data.length;
        return (
            // <StyledAppBlock>
            <AppBlock>
                <AppHeader liked={liked} allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList posts={data} onDelete={this.deleteItem} onToggleImportant={this.onToggleImportant}
                onToggledLike={this.onToggledLike}/>
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
            // </StyledAppBlock>
        )
    }
}

