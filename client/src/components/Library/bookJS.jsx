import React from 'react';
import { Link } from 'react-router-dom';

function BookJS({ openSliderMenu }) {
    return (
        <div className={"book_JS " + openSliderMenu}>
            <h3>Contents</h3>
            <div className="box_img"></div>
            <div className="list_boxes">
                <span>1.</span> <Link to="#">Values, Types, and Operators</Link>
            </div>
            <div className="list_boxes">
                <span>2.</span> <Link to="#">Program Structure</Link>
            </div>
            <div className="list_boxes">
                <span>3.</span> <Link to="#">Functions</Link>
            </div>
            <div className="list_boxes">
                <span>4.</span> <Link to="#">Data Structures: Objects and Arrays</Link>
            </div>
            <div className="list_boxes">
                <span>5.</span> <Link to="#">Higher-order Functions</Link>
            </div>
            <div className="list_boxes">
                <span>6.</span> <Link to="#">The Secret Life of Objects</Link>
            </div>
        </div>
    )
}
export default BookJS;
