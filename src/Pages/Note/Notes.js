import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useGetNotesQuery } from '../../Store/Slices/notesSlice';

import PageTitle from '../../Components/PageTitle';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 250,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'description',
    width: 150,
    editable: true,
  },
  {
    field: 'published',
    headerName: 'Published',
    width: 150,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 150,
    editable: true,
    valueGetter: (params) =>
      `${moment(params.row.createdAt).format('DD/MM/YYYY') || ''}`,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    width: 150,
    editable: true,
    valueGetter: (params) =>
      `${moment(params.row.updatedAt).format('DD/MM/YYYY') || ''}`,
  },
];

const Notes = () => {
  const {
    data: notes,
    isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetNotesQuery();

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      if (!isLoading && notes) {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: notes.map((item) => {
            return {
              id: item._id,
              ...item,
            };
          }),
          total: notes.length,
        }));
      }
    };
    fetchData();
  }, [notes, isLoading, pageState.page, pageState.pageSize]);

  return (
    <>
      <PageTitle title='Notes' />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            {!isLoading ? (
              <Box
                style={{
                  height: 'auto',
                  width: '100%',
                  marginBottom: '50px',
                }}
              >
                <DataGrid
                  autoHeight
                  rows={pageState?.data || []}
                  columns={columns}
                  // getRowId={(row) => row._id}
                  rowCount={pageState.total}
                  loading={pageState.isLoading}
                  rowsPerPageOptions={[10, 15, 30, 50, 70, 100]}
                  experimentalFeatures={{ newEditingApi: true }}
                  pagination
                  onRowClick={(params) => {
                    // redirectToReport(params.row);
                    // console.log(params.id);
                  }}
                  rowHeight={25}
                  page={pageState.page - 1}
                  pageSize={pageState.pageSize}
                  onPageChange={(newPage) => {
                    setPageState((old) => ({ ...old, page: newPage + 1 }));
                  }}
                  onPageSizeChange={(newPageSize) =>
                    setPageState((old) => ({ ...old, pageSize: newPageSize }))
                  }
                  checkboxSelection
                  disableSelectionOnClick
                  // onSelectionModelChange={(ids) => {
                  //   const selectedIDs = new Set(ids);
                  //   const selectedRows = pageState.data.filter((row) =>
                  //     selectedIDs.has(row.id.toString())
                  //   );
                  //   setSelectedRows(selectedRows);
                  // }}
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                    const selectedIDs = new Set(newRowSelectionModel);
                    const selectedRows = pageState.data.filter((row) =>
                      selectedIDs.has(row.id.toString())
                    );
                    setSelectedRows(selectedRows);
                  }}
                  rowSelectionModel={rowSelectionModel}
                />
                <Grid item xs={2} sm={4} md={4}>
                  <Box sx={{ minWidth: 275 }}>
                    {selectedRows &&
                      selectedRows.map((item) => (
                        <Card variant='outlined'>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color='text.secondary'
                              gutterBottom
                            >
                              {item._id}
                            </Typography>
                            <Typography variant='h5' component='div'>
                              {item.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                              adjective
                            </Typography>
                            <Typography variant='body2'>
                              {item.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size='small'>Learn More</Button>
                          </CardActions>
                        </Card>
                      ))}
                  </Box>
                </Grid>
              </Box>
            ) : (
              <div>No entries</div>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Notes;
