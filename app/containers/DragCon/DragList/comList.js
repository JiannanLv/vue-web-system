/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-11-08 14:11:16
 * @LastEditTime: 2019-11-21 15:30:59
 * @LastEditors: jiannan.lv
 */
const comList = [
  {
    type: 'text',
    value: '框',
    source: [
      {
        value: '测试',
        type: 'text',
        style: {
          width: '80px',
          height: '40px',
          lineHeight: '40px',
          border: '1px solid #ccc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      }
    ]
  },
  {
    type: 'img',
    value: '图片',
    source: [
      {
        src: 'host',
        type: 'img',
        style: {
          height: '40px',
          width: '40px'
        }
      },
      {
        src: 'switch',
        type: 'img',
        style: {
          height: '40px',
          width: '40px'
        }
      },
      {
        src: 'route',
        type: 'img',
        style: {
          height: '40px',
          width: '40px'
        }
      },
      {
        src: 'computer',
        type: 'img',
        style: {
          height: '40px',
          width: '40px'
        }
      }
    ]
  }
];
export default comList;
