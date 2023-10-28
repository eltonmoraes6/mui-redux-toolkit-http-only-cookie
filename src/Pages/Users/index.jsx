import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useGetUsersQuery } from '../../Store/Slices/usersSlice';

import PageTitle from '../../Components/PageTitle';
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 250,
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },

  {
    field: 'familyName',
    headerName: 'Sobrenome',
    width: 150,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Sexo',
    width: 90,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
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

const Users = () => {
  const {
    data: users,
    isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetUsersQuery();

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
      if (!isLoading && users) {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: users.users.map((item) => {
            return {
              id: item._id,
              ...item,
            };
          }),
          total: users.users.length,
        }));
      }
    };
    fetchData();
  }, [users, isLoading, pageState.page, pageState.pageSize]);

  return (
    <>
      <PageTitle title='users' />
      <Box sx={{ display: 'flex' }}>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          {!isLoading ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
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
                </Grid>
              </Grid>
              <Box height={20}></Box>
              <Grid container spacing={2}>
                {selectedRows &&
                  selectedRows.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                      <Stack spacing={2}>
                        <Card variant='outlined'>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color='text.secondary'
                              gutterBottom
                            >
                              {item.id}
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
                      </Stack>
                    </Grid>
                  ))}
              </Grid>
            </>
          ) : (
            <div>No entries</div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Users;
