import React, {Component} from "react";

import './post-list-item.css';

export  default class PostListItem extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {label, onDelete, onToggledLike, onToggleImportant, like, important} = this.props;

        let classNames = 'app-list-item d-flex justify-content-between';
        if (important) {
            classNames += ' important';
        }
        if (like) {
            classNames += ' like'
        }
        return (
            <div className={classNames}>
                    <span onClick={onToggledLike} className="app-list-item-label">
                        {label}
                    </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn-star btn-sm" onClick={onToggleImportant}>
                        <i className="fas fa-star"/>
                    </button>
                    <button className="btn-trash btn-sm" onClick={onDelete}>
                        <i className="fas fa-trash"/>
                    </button>
                    <i className="fas fa-heart"/>
                </div>
            </div>
        )
    }
}