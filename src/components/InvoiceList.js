// table of list of invoices in the redux store

import React from "react";
import { add, remove } from "../store/invoice/invoiceSlice";
import { connect } from "react-redux";
import { Button, Card, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCopy, BiEdit, BiTrash } from "react-icons/bi";
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

  removeInvoice = (invoiceNumber) => {
    this.props.removeInvoice(invoiceNumber);
  };

  render() {
    return (
      <Container className="d-flex flex-column gap-4 min-vh-100 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Invoice Generator</h3>
          {/* create invoice button */}
          <Link to="/invoice-form" className="d-flex" style={{ width: '15%' }}>
            <Button variant="primary" className="flex-grow-1">
              Create Invoice
            </Button>
          </Link>
        </div>
        <Card className="d-flex flex-column flex-grow-1 p-4">
          <Table>
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
                <tr key={invoice.invoiceNumber}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.billTo}</td>
                  <td>{invoice.dateOfIssue}</td>
                  <td>{invoice.currency}{invoice.total}</td>
                  {/* view, edit, duplicate and delete action buttons */}
                  <td className="d-flex gap-3 align-items-center">
                    <a href="/#" onClick={() => this.openModal(invoice)}>
                      <BsEyeFill size={16} />
                    </a>
                    <Link to={`/invoice-form/${invoice.invoiceNumber}`}>
                      <BiEdit size={16} />
                    </Link>
                    <Link to={'/invoice-form'} state={invoice}>
                      <BiCopy size={16} />
                    </Link>
                    <a href='/#' onClick={() => this.removeInvoice(invoice.invoiceNumber)}>
                      <BiTrash size={16} color="red" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        {
          // adding this check to avoid error when the modal is rendered before the invoice is selected
          this.state.selectedInvoice &&
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
            // dont show save button in the modal since we are not editing the invoice and just viewing it
            showSaveButton={false}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  invoices: state.invoice.invoices,
});

const mapDispatchToProps = (dispatch) => ({
  addInvoice: (invoice) => dispatch(add(invoice)),
  removeInvoice: (invoiceNumber) => dispatch(remove(invoiceNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);