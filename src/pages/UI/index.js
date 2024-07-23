import Reference from 'components/Reference'

import style from './index.module.scss'

const UI = () => {
  return (
    <div className={style.block}>
      <table>
        <tr>
          <td>
            <Reference link={'/'} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Primary</strong>
            <code>
              {`classes={['primary']}`}
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <Reference link={'/'} classes={['alt']} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Alt</strong>
            <code>
              {`classes={['alt']}`}
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <Reference link={'/'} isActive={true} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Active</strong>
            <code>
              {`isActive={true}`}
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <Reference link={'/'} isDisabled={true} placeholder={'Reference'} />
          </td>
          <td>
            <strong>Disabled</strong>
            <code>
              {`isDisabled={true}`}
            </code>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default UI
