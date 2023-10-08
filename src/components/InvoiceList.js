import React from "react";
import { add } from "../store/invoice/invoiceSlice";
import { connect } from "react-redux";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "./InvoiceModal";

class InvoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedInvoice: null,
    }
  }

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  openModal = (invoice) => {
    this.setState({ isOpen: true, selectedInvoice: invoice });
  };

  render() {
    console.log(this.props.invoices);
    return (
      <div className="d-flex flex-column gap-4 min-vh-100 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Invoice Generator</h3>
          <Link to="/invoice-form" className="d-flex" style={{ width: '15%' }}>
            <Button variant="primary" className="flex-grow-1">
              Create Invoice
            </Button>
          </Link>
        </div>
        <Card className="d-flex flex-column flex-grow-1 p-4">
          <Table striped={false} bordered={false}>
            <thead>
              <tr>
                <th className="border-top-0">Invoice Number</th>
                <th className="border-top-0">Customer Name</th>
                <th className="border-top-0">Due Date</th>
                <th className="border-top-0">Amount</th>
                <th className="border-top-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.billTo}</td>
                  <td>{invoice.dateOfIssue}</td>
                  <td>{invoice.total}</td>
                  <td className="d-flex gap-3 align-items-center">
                    <Link onClick={() => this.openModal(invoice)}>
                      <BsEyeFill size={16} />
                    </Link>
                    <Link to={`/invoice-form/${invoice.invoiceNumber}`}>
                      <BiEdit size={16} />
                    </Link>
                    <Link>
                      <BiTrash size={16} color="red" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        {
          this.state.isOpen &&
          <InvoiceModal
            showModal={this.state.isOpen}
            closeModal={this.closeModal}
            info={this.state.selectedInvoice}
            items={this.state.selectedInvoice.items}
            currency={this.state.selectedInvoice.currency}
            subTotal={this.state.selectedInvoice.subTotal}
            taxAmmount={this.state.selectedInvoice.taxAmmount}
            discountAmmount={this.state.selectedInvoice.discountAmmount}
            total={this.state.selectedInvoice.total}
            showSaveButton={false}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  invoices: state.invoice.invoices,
});

const mapDispatchToProps = (dispatch) => ({
  addInvoice: (invoice) => dispatch(add(invoice)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);