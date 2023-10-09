// HOC to pass router props to components
// Need it because we can't use hooks like useParams() in class components
// WithRouter in react-router-dom is deprecated, so we need to create our own

import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    />
  );
};

export default withRouter;