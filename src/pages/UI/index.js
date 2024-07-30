import { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NAVIGATION } from 'constant/config'

import { getData } from 'helpers/api'

import Breadcrumbs from 'modules/Breadcrumbs'
import Notification from 'components/Notification'
import Uploader from 'components/Uploader'
import Password from 'components/Password'
import Field from 'components/Field'
import Phone from 'components/Phone'
import Reference from 'components/Reference'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Tab from 'components/Tab'
import Select from 'components/Select'
import Title from 'components/Title'
import Paragraph from 'components/Paragraph'

import style from './index.module.scss'

const UI = () => {
  const TAB = ['Tab 1', 'Tab 2', 'Tab 3']
  const NAV = ['Reference', 'Button', 'Field', 'Notification', 'Elements', 'Text']

  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [photos, setPhotos] = useState('')
  const [tab, setTab] = useState(0)
  const [checkbox, setCheckbox] = useState(0)
  const [country, setCountry] = useState(0)
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState(0)  

  useEffect(() => {
    getData('countries/').then(json => {
      setCountries(json)
      setLoading(false)
    })
  }, [])
  

  if(loading)
    return false

  return (
    <div className={style.block}>
      <div className={style.nav}>
        {
          NAV.map((el, idx) =>
            <Button 
              key={idx}
              classes={['alt', 'md', style.button]}
              isActive={idx === show}
              placeholder={el} 
              onChange={() => setShow(idx)}
            />
          )
        }
      </div>

      <div className={style.content}>
        {
          show === 0 &&
          <table>
            <tr>
              <td>
                <Reference link={'/'} icon={'fa-solid fa-times'} placeholder={'Reference'} />
              </td>
              <td>
                <strong>Primary</strong>
                <pre>{`icon={'fa-solid fa-times'}`}</pre>
                <pre>{`placeholder={'Reference'}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Reference link={'/'} classes={['alt']} placeholder={'Reference'} />
              </td>
              <td>
                <strong>Alt</strong>
                <pre>{`classes={['alt']}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Reference link={'/'} isActive={true} placeholder={'Reference'} />
              </td>
              <td>
                <strong>Active</strong>
                <pre>{`isActive={true}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Reference link={'/'} isDisabled={true} placeholder={'Reference'} />
              </td>
              <td>
                <strong>Disabled</strong>
                <pre>{`isDisabled={true}`}</pre>
              </td>
            </tr>
          </table>
        }
        
        {
          show === 1 &&
          <table>
            <tr>
              <td>
                <Button icon={'fa-solid fa-times'} placeholder={'Button'} onChange={() => alert("Button")} />
              </td>
              <td>
                <strong>Primary</strong>
                <pre>{`icon={'fa-solid fa-times'}`}</pre>
                <pre>{`placeholder={'Button'}`}</pre>
                <pre>{`onChange={() => alert("Button")}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Button classes={['alt']} placeholder={'Button'} />
              </td>
              <td>
                <strong>Alt</strong>
                <pre>{`classes={['alt']}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Button isActive={true} placeholder={'Button'} />
              </td>
              <td>
                <strong>Active</strong>
                <pre>{`isActive={true}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Button isDisabled={true} placeholder={'Button'} />
              </td>
              <td>
                <strong>Disabled</strong>
                <pre>{`isDisabled={true}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Button classes={['primary', 'sm']} placeholder={'Button'} />
              </td>
              <td>
                <strong>Classes</strong>
                <pre>{`classes={['primary', 'sm']}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Button classes={['primary', 'md']} placeholder={'Button'} />
              </td>
              <td>
                <strong>Classes</strong>
                <pre>{`classes={['primary', 'md']}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Button classes={['primary', 'square']} icon={'fa-solid fa-times'} />
              </td>
              <td>
                <strong>Classes</strong>
                <pre>{`classes={['primary', 'square']}`}</pre>
                <pre>{`icon={'fa-solid fa-times'}`}</pre>
              </td>
            </tr>
          </table>
        }

        {
          show === 2 &&
          <table>
            <tr>
              <td>
                <Field
                  type={'text'}
                  placeholder={'Text'}
                  data={text}
                  onChange={e => setText(e)}
                  isRequired={true}
                />
              </td>
              <td>
                <strong>Password</strong>
                <pre>{`type={'text'}`}</pre>
                <pre>{`placeholder={'Text'}`}</pre>
                <pre>{`data={text}`}</pre>
                <pre>{`onChange={e => setText(e)}`}</pre>
                <pre>{`isRequired={true}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Password
                  placeholder={'Password'}
                  data={password}
                  onChange={(e) => setPassword(e)}
                  isRequired={true}
                />
              </td>
              <td>
                <strong>Password</strong>
                <pre>{`placeholder={'Password'}`}</pre>
                <pre>{`data={password}`}</pre>
                <pre>{`onChange={e => setPassword(e)}`}</pre>
                <pre>{`isRequired={true}`}</pre>
              </td>
            </tr>
          </table>
        }

        {
          show === 3 &&
          <table>
            <tr>
              <td>
                <Notification 
                  text={'Notification text'}
                  type={'error'}
                />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`text={'Notification text'}`}</pre>
                <pre>{`type={'error'}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Notification 
                  text={'Notification text'}
                  type={'success'}
                />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`text={'Notification text'}`}</pre>
                <pre>{`type={'success'}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Notification 
                  text={'Notification text'}
                  type={'info'}
                />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`text={'Notification text'}`}</pre>
                <pre>{`type={'info'}`}</pre>
              </td>
            </tr>
          </table>
        }

        {
          show === 4 &&
          <table>
            <tr>
              <td>
                <Breadcrumbs
                  data={[
                    NAVIGATION.home,
                    NAVIGATION.check_ticket
                  ]}
                  current={NAVIGATION.broadcast}
                />
              </td>
              <td>
                <strong>Phone</strong>
                <pre>{`data={[NAVIGATION.home, NAVIGATION.check_ticket]}`}</pre>
                <pre>{`current={NAVIGATION.broadcast}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Phone 
                  data={phone}
                  onChange={e => setPhone(e)}
                  isRequired={true}
                />
              </td>
              <td>
                <strong>Phone</strong>
                <pre>{`data={phone}`}</pre>
                <pre>{`onChange={e => setPhone(e)}`}</pre>
                <pre>{`isRequired={true}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Select
                  placeholder={'Country'}
                  options={countries.map(item => ({
                    value: item.alpha_2,
                    label: item.name,
                  }))}
                  data={country}
                  isRequired={true}
                  onChange={e => setCountry(e)}
                />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`placeholder={'Country'}`}</pre>
                <pre>{`options={countries.map(item => ({
                    value: item.alpha_2,
                    label: item.name,
                  }))}`}
                </pre>
                <pre>{`data={country}`}</pre>  
                <pre>{`isRequired={true}`}</pre>
                <pre>{`onChange={e => setCountry(e)}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  data={checkbox}
                  placeholder={'Checkbox'}
                  onChange={e => setCheckbox(e)}
                />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`placeholder={'Checkbox'}`}</pre>
                <pre>{`data={checkbox}`}</pre>
                <pre>{`onChange={e => setCheckbox(e)}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  data={checkbox}
                  placeholder={'Checkbox'}
                  classes={['sm']}
                  onChange={() => alert('Checkbox')}
                />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`placeholder={'Checkbox'}`}</pre>
                <pre>{`data={checkbox}`}</pre>
                <pre>{`classes={['sm']}`}</pre>
                <pre>{`onChange={e => setCheckbox(e)}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Uploader data={photos} onChange={setPhotos} />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`onChange={setPhotos}`}</pre>
                <pre>{`data={'photos'}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Tab
                  data={TAB}
                  active={tab}
                  setActive={setTab}
                />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`active={tab}`}</pre>
                <pre>{`setActive={setTab}`}</pre>
              </td>
            </tr>
          </table>
        }

        {
          show === 5 &&
          <table>
            <tr>
              <td>
                <Title text={'Title'} isLoading={true} />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`text={'Title'}`}</pre>
                <pre>{`isLoading={true}`}</pre>
              </td>
            </tr>
            <tr>
              <td>
                <Paragraph text={'Paragraph'} isLoading={true} />
              </td>
              <td>
                <strong>Options</strong>
                <pre>{`text={'Paragraph'}`}</pre>
                <pre>{`isLoading={true}`}</pre>
              </td>
            </tr>
          </table>
        }
      </div>
    </div>
  )
}

export default UI
