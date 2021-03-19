using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using apiRecibos.Context;
using apiRecibos.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiRecibos.Controllers
{

    [Route("api/[controller]")]
    public class recibosController : Controller
    {
        private readonly dbContext context;

        public recibosController(dbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult Index()
        {
            try
            {
                return Ok(context.recibos.ToList());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}", Name ="GetRecibo")]
        public ActionResult Get(int id)
        {
            try
            {
                var recibo = context.recibos.FirstOrDefault(recibo => recibo.id_recibo == id);
                return Ok(recibo);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] recibos recibo)
        {
            try
            {
                context.recibos.Add(recibo);
                context.SaveChanges();
                return CreatedAtRoute("GetRecibo", new { id = recibo.id_recibo }, recibo);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]

        public ActionResult Put (int id,[FromBody] recibos recibo)
        {
                try
                {
                    if (recibo.id_recibo == id)
                    {


                    context.Entry(recibo).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetRecibo", new { id = recibo.id_recibo }, recibo);
                    }
                else
                {
                    return BadRequest();
                }

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
        }


        [HttpDelete("{id}")]

        public ActionResult Delete(int id)
        {
            try
            {
                var recibo = context.recibos.FirstOrDefault(g => g.id_recibo == id);

                if (recibo != null)
                {


                    context.recibos.Remove(recibo);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


    }
}
