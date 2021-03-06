import { connect } from 'react-redux';
import Controls from '../components/controls';

const mapStateToProps = ({ static: { url } }) => ({ url });

export default connect(mapStateToProps)(Controls);
