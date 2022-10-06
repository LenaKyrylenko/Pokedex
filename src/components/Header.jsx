import { Col, Row } from 'antd'
import { Filter } from './Filter'

const Header = ({ getFilter, url }) => (
  <>
    <div className="Title">
      <Row>
        <Col span={10}
        xs={{span:15}}
        >
          <p className="TitleH1"> Pokedex</p>
        </Col>
      </Row>{' '}
      <Col>
        <Filter getFilter={getFilter} url={url} />
      </Col>
    </div>
  </>
)
export default Header
