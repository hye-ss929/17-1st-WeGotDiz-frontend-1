import React, { Component } from 'react';

import Header from './Components/Header/Header';
import Tabs from './Components/Tabs/Tabs';
import Aside from './Components/Aside/Aside';
import Story from './Components/Story/Story';
import Policy from './Components/Policy/Policy';
import Community from './Components/Community/Community';
import './Product.scss';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      currentId: 1,
      productData: {},
      infoData: {},
      makerLevelData: [],
      tabsData: [],
    };
  }

  componentDidMount() {
    this.handleData();
  }

  handleData = () => {
    fetch(`http://10.58.2.108:8000/product/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          productData: res.data,
          infoData: res.data.info_box,
          makerLevelData: res.data.maker_levels,
          tabsData: res.data.tab_names,
        });
      });

    fetch('/data/makerInfoData.json')
      .then(res => res.json())
      .then(res => {
        this.setState({
          makerInfoData: res,
        });
      });
  };

  handleTab = id => {
    this.setState({
      currentId: id,
    });
  };

  render() {
    const { handleTab } = this;
    const {
      currentId,
      productData,
      infoData,
      makerLevelData,
      tabsData,
      makerInfoData,
    } = this.state;
    console.log('파람몇이야 여긴 프로덕트 >>>>' + this.props.match.params.id);
    return (
      <main className="product">
        {productData && (
          <>
            <Header productData={productData} />
            <Tabs
              handleTab={handleTab}
              tabsData={tabsData}
              currentId={currentId}
            />
            <div className="contentsContainer">
              <content>{MAPPING_TAB[currentId]}</content>
              <Aside
                productData={productData}
                infoData={infoData}
                makerInfoData={makerInfoData}
                makerLevelData={makerLevelData}
              />
            </div>
          </>
        )}
      </main>
    );
  }
}

const MAPPING_TAB = {
  1: <Story />,
  2: <Policy />,
  3: <Community />,
};

export default Product;
