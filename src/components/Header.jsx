import { Col, Row } from 'antd'
import { Filter } from './Filter'

const Header = ({ getFilter, url }) => (
  <>
    <div className="Title">
      <Row> <Col offset={10}>
       
          <h1 className="TitleH1"> Pokedex</h1>
        </Col>
      </Row>

      <Row>
        {' '}
        <Col offset={10}>
          <Filter getFilter={getFilter} url={url} />
        </Col>{' '}
      </Row>
    </div>
    <Row></Row>
  </>
)
export default Header
