import sql from 'mssql';

export const getCurrentCommission = async (req, res) => {

    var config = {
        user: 'chalkcouture',
        password: 'B9V6~10|PX7v',
        server: 'exigosqlsyncsandbox.c61qznpqe2o1.us-west-1.rds.amazonaws.com',
        database: 'sandbox',
        port: 4433
    };

    sql.connect(config, function (err) {
        var request = new sql.Request();
        request.input('CustomerId', sql.Int, req.params.cid)
            .query(`SELECT
            pv.CustomerID
            ,Total = c.Total
            ,r.RankID
            ,r.RankDescription
            ,p.PeriodID
            ,p.PeriodDescription
        FROM PeriodVolumes AS pv
        INNER JOIN Periods AS p 
            ON p.PeriodID = pv.PeriodID
        JOIN CommissionRuns cr
            ON cr.PeriodID = p.PeriodID
        JOIN Commissions c
            ON c.CommissionRunID = cr.CommissionRunID
            AND c.CustomerID = pv.CustomerID
        INNER JOIN Ranks AS r 
            ON r.RankID = pv.PaidRankID
        WHERE 
            pv.CustomerID = @CustomerId
            AND pv.PeriodTypeId = 1
            AND p.EndDate BETWEEN '2019-04-17' AND DATEADD(hh, -24, '2019-10-17')`,
                function (err, recordset) {
                    if (err) {
                        sql.close();
                        res.send(err);
                    }
                    else {
                        sql.close();
                        res.send(recordset.recordset);
                    }
                });
    });
}

export const getSummaryCommission = async (req, res) => {

    var config = {
        user: 'chalkcouture',
        password: 'B9V6~10|PX7v',
        server: 'exigosqlsyncsandbox.c61qznpqe2o1.us-west-1.rds.amazonaws.com',
        database: 'sandbox',
        port: 4433
    };

    sql.connect(config, function (err) {
        var request = new sql.Request();
        request.input('CustomerId', sql.Int, req.params.cid)
            .query(`  SELECT
            hs.DesignerID
            ,StartDate = hs.Period
            ,hs.PaidAsTitle
            ,hs.Commission
            ,hs.PV
            ,hs.TV
            ,hs.EV
            ,hs.PSQ
            ,hs.L1M
            ,hs.MML
            ,p.PeriodID
            ,p.PeriodTypeID
            ,p.PeriodDescription
            ,p.StartDate
            ,p.EndDate
          ,dateadd(day, 1, p.EndDate) as ActualEndDate
        FROM [HistoricalCommission].[HistoricalSummary] hs
        INNER JOIN Periods p
        ON CONVERT(date, hs.Period) = CONVERT(date, p.StartDate)
        WHERE designerid = @CustomerId
        ORDER BY p.StartDate DESC`,
                function (err, recordset) {
                    if (err) {
                        sql.close();
                        res.send(err);
                    }
                    else {
                        sql.close();
                        res.send(recordset.recordset);
                    }
                });
    });
}



export const getHistoricalCommission = async (req, res) => {

    var config = {
        user: 'chalkcouture',
        password: 'B9V6~10|PX7v',
        server: 'exigosqlsyncsandbox.c61qznpqe2o1.us-west-1.rds.amazonaws.com',
        database: 'sandbox',
        port: 4433
    };

    sql.connect(config, function (err) {
        var request = new sql.Request();
        request.input('CustomerId', sql.Int, req.params.cid)
            .input('CommissionRunID', sql.Int, req.params.crid)
            .query(` SELECT c.CommissionRunID
            ,c.CustomerID
            ,c.CurrencyCode
            ,c.Earnings
            ,c.PreviousBalance
            ,c.BalanceForward
            ,c.Fee
            ,c.Total
            ,cr.CommissionRunDescription
            ,cr.PeriodTypeID
            ,cr.RunDate
            ,cr.CommissionRunStatusID
            ,cr.HideFromWeb
            ,cr.PlanID
            ,RankID = pv.PaidRankID
            ,r.RankDescription
            ,cr.PeriodID
            ,p.PeriodDescription
              ,p.PeriodTypeID
            ,p.StartDate
            ,p.EndDate
            ,dateadd(day, 1, p.EndDate) as ActualEndDate
            ,cr.AcceptedDate
      FROM Commissions c
          LEFT JOIN CommissionRuns cr
              ON c.CommissionRunID = cr.CommissionRunID
          LEFT JOIN Periods p
              ON cr.periodid = p.periodid
              and cr.periodtypeid = p.periodtypeid
          LEFT JOIN PeriodVolumes pv 
              ON pv.periodid = p.periodid
              and pv.periodtypeid = p.periodtypeid
              and pv.customerid = c.customerid
          LEFT JOIN Ranks r
              ON r.RankID = pv.PaidRankID
      WHERE c.CustomerID = @CustomerID
          AND c.CommissionRunID = @CommissionRunID
      ORDER BY cr.periodid DESC`,
                function (err, recordset) {
                    if (err) {
                        sql.close();
                        res.send(err);
                    }
                    else {
                        sql.close();
                        res.send(recordset.recordset);
                    }
                });
    });
}