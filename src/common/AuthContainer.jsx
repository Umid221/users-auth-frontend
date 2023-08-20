import { string, any } from "prop-types";

function AuthContainer({ cardTitle, children }) {
  return (
    <div className="d-flex justify-content-center align-items-center pt-5">
      <div className="card w-25 auth-card mt-5">
        <div className="card-body">
          <h5 className="card-title text-center">{cardTitle}</h5>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;

AuthContainer.propTypes = { cardTitle: string, children: any };
