import sql from 'mssql';

export const getCommissionByClientId = async (req, res) => {

    var config = {
        user: 'chalkcouture',
        password: 'B9V6~10|PX7v',
        server: 'exigosqlsyncsandbox.c61qznpqe2o1.us-west-1.rds.amazonaws.com',
        database: 'sandbox',
        port: 4433
    };
   
    sql.connect(config, function (err) {
        var request = new sql.Request();
        request.input('CustomerId', sql.Int, req.params.id)
            .query(`SELECT
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
                        res.send(recordset);
                    }
                });
    });
}