import { connect } from 'react-redux';
import MoveAccount from './MoveAccount';

const mapStateToProps = ({
  dictionary,
}) => ({
  dictionary,
});

export default connect(mapStateToProps)(MoveAccount);
