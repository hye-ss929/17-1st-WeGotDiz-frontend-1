import React, { Component } from 'react';
import FundList from './Funded/FundList/FundList';
import './MypageHeader.scss';

class MypageHeader extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <div className="mypageHeader">
        {userInfo.map((info, idx) => {
          return (
            <div className="contentHeader" key={idx}>
              <h1>{info.userName}</h1>
              <p>개인회원</p>
              <img
                className="userImg"
                src="https://media.vlpt.us/images/hyehye/post/b33666d0-2d98-4f96-8b5f-0777deb7c8de/userDefaultImage.png"
                alt="user_blank"
              />
              <ul className="headerText">
                <li>
                  <strong>99</strong>
                  <span>펀딩</span>
                </li>
                <li>
                  <strong>99</strong>
                  <span>좋아요</span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MypageHeader;