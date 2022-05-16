import { useSelector } from 'react-redux';
import { selectMenuItemById } from '../features/menu/menuSlice';

export default function OrderItemTableRow({ orderItem }) {
  const { name, price } = useSelector(
    selectMenuItemById(
      typeof orderItem.menuItem === 'string'
        ? orderItem.menuItem
        : orderItem.menuItem._id
    )
  );

  return (
    <tr>
      <td>
        <p className='mb-0'>{name}</p>
        {Object.keys(orderItem.selectedOptions).length ? (
          <ul className='mb-0'>
            {Object.entries(orderItem.selectedOptions).map(
              ([option, selectedValue]) => (
                <li key={option}>
                  {option}: {selectedValue}
                </li>
              )
            )}
          </ul>
        ) : null}
      </td>
      <td className='align-middle'>
        {(price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </td>
    </tr>
  );
}
