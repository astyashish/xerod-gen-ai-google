import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Download,
  CreditCard,
  Schedule,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { sampleAnalytics } from '../data/sampleData';

const Earnings = () => {
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const availableBalance = sampleAnalytics.monthlyEarnings;
  const pendingPayouts = 3250;
  const totalEarnings = sampleAnalytics.totalEarnings;
  const thisMonthEarnings = sampleAnalytics.monthlyEarnings;

  const payoutHistory = [
    {
      id: 'PAY-001',
      amount: 12500,
      date: '2023-11-15',
      status: 'Completed',
      method: 'Bank Transfer',
      transactionId: 'TXN123456789',
    },
    {
      id: 'PAY-002',
      amount: 8750,
      date: '2023-11-01',
      status: 'Completed',
      method: 'Bank Transfer',
      transactionId: 'TXN123456788',
    },
    {
      id: 'PAY-003',
      amount: 6200,
      date: '2023-10-15',
      status: 'Completed',
      method: 'UPI',
      transactionId: 'TXN123456787',
    },
    {
      id: 'PAY-004',
      amount: 4500,
      date: '2023-10-01',
      status: 'Processing',
      method: 'Bank Transfer',
      transactionId: 'TXN123456786',
    },
  ];

  const earningsBreakdown = [
    {
      marketplace: 'Amazon',
      earnings: 18750,
      commission: 2812,
      net: 15938,
      percentage: 45,
    },
    {
      marketplace: 'Flipkart',
      earnings: 12500,
      commission: 1500,
      net: 11000,
      percentage: 30,
    },
    {
      marketplace: 'Etsy',
      earnings: 8333,
      commission: 541,
      net: 7792,
      percentage: 20,
    },
    {
      marketplace: 'Direct Sales',
      earnings: 2083,
      commission: 104,
      net: 1979,
      percentage: 5,
    },
  ];

  const handleWithdraw = () => {
    if (withdrawAmount && parseFloat(withdrawAmount) <= availableBalance) {
      console.log('Processing withdrawal:', { amount: withdrawAmount, method: withdrawMethod });
      // Simulate withdrawal processing
      alert('Withdrawal request submitted successfully!');
      setWithdrawAmount('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Processing':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Earnings & Payouts
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'success.light',
                    color: 'success.main',
                  }}
                >
                  <AccountBalance />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Available Balance
                  </Typography>
                  <Typography variant="h5" fontWeight="600" color="success.main">
                    ₹{availableBalance.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'warning.light',
                    color: 'warning.main',
                  }}
                >
                  <Schedule />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pending Payouts
                  </Typography>
                  <Typography variant="h5" fontWeight="600">
                    ₹{pendingPayouts.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                  }}
                >
                  <TrendingUp />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    This Month
                  </Typography>
                  <Typography variant="h5" fontWeight="600">
                    ₹{thisMonthEarnings.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'info.light',
                    color: 'info.main',
                  }}
                >
                  <CheckCircle />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Earnings
                  </Typography>
                  <Typography variant="h5" fontWeight="600">
                    ₹{totalEarnings.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Withdrawal Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Withdraw Earnings
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                Minimum withdrawal amount is ₹500. Funds typically arrive within 2-3 business days.
              </Alert>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Amount to Withdraw"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  sx={{ mb: 2 }}
                  helperText={`Available: ₹${availableBalance.toLocaleString()}`}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Withdrawal Method</InputLabel>
                  <Select
                    value={withdrawMethod}
                    label="Withdrawal Method"
                    onChange={(e) => setWithdrawMethod(e.target.value)}
                  >
                    <MenuItem value="bank">Bank Transfer</MenuItem>
                    <MenuItem value="upi">UPI</MenuItem>
                    <MenuItem value="wallet">Digital Wallet</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) < 500}
                  startIcon={<AccountBalance />}
                >
                  Request Withdrawal
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Payment Schedule
              </Typography>
              <Typography variant="body2">
                • Weekly payouts every Friday
              </Typography>
              <Typography variant="body2">
                • No processing fees
              </Typography>
              <Typography variant="body2">
                • Instant UPI transfers available
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Earnings Breakdown */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Earnings by Marketplace
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {earningsBreakdown.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="600">
                        {item.marketplace}
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight="600">
                        ₹{item.net.toLocaleString()}
                      </Typography>
                    </Box>
                    
                    <LinearProgress
                      variant="determinate"
                      value={item.percentage}
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="caption" color="text.secondary">
                          Gross Earnings
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          ₹{item.earnings.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="caption" color="text.secondary">
                          Commission
                        </Typography>
                        <Typography variant="body2" color="error">
                          -₹{item.commission.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="caption" color="text.secondary">
                          Net Earnings
                        </Typography>
                        <Typography variant="body2" fontWeight="600" color="success.main">
                          ₹{item.net.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Payout History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Payout History
                </Typography>
                <Button variant="outlined" startIcon={<Download />}>
                  Export History
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Payout ID</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Transaction ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payoutHistory.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="600">
                            {payout.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="600">
                            ₹{payout.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {new Date(payout.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CreditCard sx={{ fontSize: 16 }} />
                            {payout.method}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={payout.status}
                            color={getStatusColor(payout.status)}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {payout.transactionId}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Earnings;