import React from 'react';
import { 
    AccumulationChartComponent, 
    AccumulationSeriesCollectionDirective, 
    AccumulationSeriesDirective, 
    Inject, 
    AccumulationTooltip 
} from '@syncfusion/ej2-react-charts';

const Chart = (props) => {

  const { allUsers } = props;

  // extracting name and country property
  const userData = allUsers.map(user => {
    return {
        name: user.name,
        country: user.location.split(", ")[1]
    }
  });

  let obj = {};

  // creating array of objects of countries with users array in each country
  /**
   * ex format = [
   *    {
   *      "brazil": [user1, user2, user3, user4],
   *      "america": [user5, user6, user7, user8, user9]
   *    }
   * ]
   */
  for (let el of userData) {
      if (obj[el.country]) {
          obj[el.country].push(el.name);
      } else {
          obj[el.country] = [el.name];
      }
  }

  let newUserList = [];

  // finding users length
  /**
   * ex format = [
   *    {
   *      "brazil": 4,
   *      "america": 5
   *    }
   * ]
   */
  for (let el in obj) {
    newUserList.push({
        country: el,
        users: obj[el].length
    });
  }

  // sorting object by no of users in descending order 
  newUserList.sort((a,b) => b.users - a.users);

  // counting total users
  let totalUsers = newUserList.reduce((total, user) => {
    return total + user.users
  }, 0);

  // calculating % users for in each country
  const finalList = newUserList.map(item => {
      return {
          country: item.country,
          perc: ((item.users/totalUsers)*100).toFixed(2)
      }
  })


  return (
    <div>
        <h5 className="text-center my-2">% of Users Country Wise(Top 10)</h5>
        <AccumulationChartComponent 
            className='charts' 
            tooltip={{enable: true, duration: 700}}  
            tooltipRender={(args) => (args.text = `${args.point.x}: ${args.point.y}%`)}
        >
        <Inject services={[AccumulationTooltip]}/>
        <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective 
                dataSource={finalList.slice(0,10)} 
                xName='country' 
                yName='perc'
            >
            </AccumulationSeriesDirective>
        </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
    </div>
  )
}

export default Chart