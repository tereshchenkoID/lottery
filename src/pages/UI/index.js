import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Reference from 'components/Reference'
import Button from 'components/Button'

import style from './index.module.scss'

const UI = () => {
  return (
    <div className={style.block}>
      <table>
        <tr>
          <td>
            <Reference link={'/'} icon={'fa-solid fa-times'} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Primary</strong>
            <code>{`icon={'fa-solid fa-times'}`}</code>
            <code>{`classes={['primary']}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Reference link={'/'} classes={['alt']} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Alt</strong>
            <code>{`classes={['alt']}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Reference link={'/'} isActive={true} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Active</strong>
            <code>{`isActive={true}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Reference link={'/'} isDisabled={true} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Disabled</strong>
            <code>{`isDisabled={true}`}</code>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            <Button icon={'fa-solid fa-times'} placeholder={'Button'} />
          </td>
          <td>
            <strong>Primary</strong>
            <code>{`icon={'fa-solid fa-times'}`}</code>
            <code>{`classes={['primary']}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Button classes={['alt']} placeholder={'Button'} />
          </td>
          <td>
            <strong>Alt</strong>
            <code>{`classes={['alt']}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Button isActive={true} placeholder={'Button'} />
          </td>
          <td>
            <strong>Active</strong>
            <code>{`isActive={true}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Button isDisabled={true} placeholder={'Button'} />
          </td>
          <td>
            <strong>Disabled</strong>
            <code>{`isDisabled={true}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Button classes={['primary', 'sm']} placeholder={'Button'} />
          </td>
          <td>
            <strong>Classes</strong>
            <code>{`classes={['primary', 'sm']}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Button classes={['primary', 'md']} placeholder={'Button'} />
          </td>
          <td>
            <strong>Classes</strong>
            <code>{`classes={['primary', 'md']}`}</code>
          </td>
        </tr>
        <tr>
          <td>
            <Button classes={['primary', 'square']} icon={'fa-solid fa-times'} />
          </td>
          <td>
            <strong>Classes</strong>
            <code>{`classes={['primary', 'square']}`}</code>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default UI
