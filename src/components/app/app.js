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
                {label: 'Going to learn React', important: false, like:false, id: 1},
                {label: 'That is so good', important: false, like:false, id: 2},
                {label: 'I need a break', important: false, like:false, id: 3}
            ],
            term:'',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggledLike = this.onToggledLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
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
    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return  items.filter(item => {
            return item.label.indexOf(term) > -1
        })
    }
    onUpdateSearch(term) {
        this.setState({term});
    }
    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }
    onFilterSelect (filter) {
        this.setState({filter})
    }
    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item=> item.like).length;
        const allPosts =data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        return (
            // <StyledAppBlock>
            <AppBlock>
                <AppHeader liked={liked} allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts} onDelete={this.deleteItem} onToggleImportant={this.onToggleImportant}
                onToggledLike={this.onToggledLike}/>
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
            // </StyledAppBlock>
        )
    }
}

